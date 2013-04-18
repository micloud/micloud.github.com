package org.wikiwizard.jspwiki.plugin;

import java.util.ArrayList;
import java.util.Map;
import java.util.Stack;

import javax.servlet.http.Cookie;

import org.apache.ecs.xhtml.col;

import com.ecyrd.jspwiki.WikiContext;
import com.ecyrd.jspwiki.WikiEngine;
import com.ecyrd.jspwiki.plugin.PluginException;
import com.ecyrd.jspwiki.plugin.PluginManager;
import com.ecyrd.jspwiki.plugin.WikiPlugin;

/**
 * @author Tim Wieschadlo
 * @date 23.04.2006
 */

public class TreeView implements WikiPlugin {

	/*
	 * JSPWiki
	 */
	WikiContext					context;
	WikiEngine					engine;
	String						pageName;

	/*
	 * important Fields
	 */
	boolean						expanded			= false;
	boolean						useCookies			= true;
	boolean						usePageName			= false;
	boolean						states[];
	byte						depth[];
	String						lines[];
	String						leafImg				= "leaf.gif";
	String						expandImg			= "minus.gif";
	String						collapseImg			= "plus.gif";
	String						treeName			= "treeview";
	String						templateDir			= "default";
	/*
	 * TreeStructture
	 */
	TreeNode					rootNode			= new TreeNode("root", true);
	/*
	 * Constants
	 */
	private static final String	TREE_EXPANDED		= "expanded";
	private static final String	TREE_USE_COOKIES	= "cookies";
	private static final String	TREE_LEAF_IMG		= "leaf";
	private static final String	TREE_EXPANDED_IMG	= "expand";
	private static final String	TREE_COLLAPSED_IMG	= "collapse";
	private static final String	TREE_NAME			= "name";
	private static final String	TREE_USE_PAGENAME	= "pagename";

	public String execute(WikiContext context, Map params)
			throws PluginException {
		this.context = context;
		this.engine = context.getEngine();
		this.pageName = context.getPage().getName();
		StringBuffer res = new StringBuffer();
		templateDir = engine.getTemplateDir();
		processParams(params);
		if (usePageName)
			treeName = treeName + pageName;
		depth = getDepth();
		processCookies(res);
		buildTree(res);
		appendWriteCookieJS(res);
		appendJS(engine, res);
		buildHTML(res);
		return res.toString();
	}

	private void appendWriteCookieJS(StringBuffer res) {
		res
				.append("<script language=\"JavaScript\" type=\"text/JavaScript\">\n");
		res.append("function " + treeName + "generateTreeCookieData()\n");
		res.append("{\n");

		res.append("	var array = document.getElementsByTagName(\"table\");\n");
		res.append("	var data = \"\";\n");
		res.append("	for (i = 0; i < array.length; i++)\n");
		res.append("	{\n");
		res.append("       if (array[i].className == \"" + treeName + "\")\n");
		res
				.append("		data += (array[i].style.display == 'none') ? \"0\" : \"1\" ;\n");
		res.append("	}\n");
		res.append("	return data;\n");
		res.append("}\n");
		res.append("function " + treeName + "writeTreeCookie () {\n");
		res.append(" var expire = 1000 * 60 * 60 * 24 * 365;\n");
		res.append("	  var now = new Date();\n");
		res.append("	  var exTime = new Date(now.getTime() + expire);\n");
		res
				.append("	  var value = " + treeName
						+ "generateTreeCookieData();\n");
		res
				.append("	  document.cookie = \""
						+ treeName
						+ "=\" + value + \"; expires=\" + exTime.toGMTString() + \";\";\n");
		res.append("}\n");
		// build tree from cookie
		res.append("</script>\n");
	}

	private void appendJS(WikiEngine engine, StringBuffer res) {
		res
				.append("<script language=\"JavaScript\" type=\"text/JavaScript\">\n"
						+ "function "
						+ treeName
						+ "toggleTreeView(node)\n"
						+ "{\n"
						+ "    var Knoten = node.parentNode.parentNode;\n"
						+ "    var childs = Knoten.childNodes;\n"
						+ "    var childcount = childs.length;\n"
						+ "    for (var i = 0; i < childcount; i++)\n"
						+ "    {\n"
						+ "            var child = childs[i].childNodes;\n"
						+ "            for (var j = 0; j < child.length;j++)\n"
						+ "            {\n"
						+ "                if (child[j].nodeName == \"TABLE\")\n"
						+ "                {\n"
						+ "                    if (child[j].style.display == 'none')\n"
						+ "                    {\n"
						+ "                        child[j].style.display = 'block';\n"
						+ "                    }\n"
						+ "                    else\n"
						+ "                    {\n"
						+ "                        child[j].style.display = 'none';\n"
						+ "                    }\n"
						+ "                }\n"
						+ "                if (child[j].nodeName == \"IMG\" && (child[j].className == \""
						+ treeName
						+ "NodeC\" || child[j].className == \""
						+ treeName
						+ "NodeE\" ))\n"
						+ "                {\n"
						+ "                    var source = child[j].src;\n"
						+ "                    var ergebnis = source.search(/.+"
						+ collapseImg
						+ "*/);\n"
						+ "                    if (ergebnis != -1)\n"
						+ "                    {\n"
						+ "                        child[j].src=\"templates/"
						+ engine.getTemplateDir()
						+ "/img/"
						+ expandImg
						+ "\";\n"
						+ "                    }\n"
						+ "                    else\n"
						+ "                    {\n"
						+ "                        child[j].src=\"templates/"
						+ engine.getTemplateDir()
						+ "/img/"
						+ collapseImg
						+ "\";\n"
						+ "                    }\n"
						+ "                }\n"
						+ "             }\n"
						+ "     }\n"
						+ treeName + "writeTreeCookie();\n"
						+ "}\n"
						+ "</script>\n\n\n");
	}

	private void buildHTML(StringBuffer res) {
		if (rootNode.hasChilds()) {
			for (int i = 0; i < rootNode.childs.size(); i++)
				res.append(rootNode.childs.get(i).toString());
		}
	}

	private void buildTree(StringBuffer res) {
		Stack stack = new Stack();
		rootNode = new TreeNode("rootNode", true);
		TreeNode current = rootNode;
		stack.push(rootNode);
		TreeNode next = new TreeNode(lines[0], states[0]);
		rootNode.addChild(next);
		current = next;
		// for (int i = 0; i < states.length; i++)
		// res.append("<br/>States Data "+i+": " + ((states[i]) ? '1' : '0'));
		for (int i = 1; i < depth.length; i++) {
			// res.append(((states[i]) ? '1' : '0'));
			if (depth[i - 1] < depth[i]) {
				stack.push(current);
				next = new TreeNode(lines[i], states[i]);
				current.addChild(next);
				current = next;
			} else if (depth[i - 1] == depth[i]) {
				next = new TreeNode(lines[i], states[i]);
				((TreeNode) stack.peek()).addChild(next);
				current = next;
			} else {
				for (int j = 0; j < depth[i - 1] - depth[i]; j++) {
					stack.pop();
				}
				current = (TreeNode) stack.peek();
				next = new TreeNode(lines[i], states[i]);
				current.addChild(next);
				current = next;
			}
		}
	}

	private byte[] getDepth() {
		/* alle relevanten lines abarbeiten und zugehörige Tiefe speichern */
		byte depth[] = new byte[lines.length];
		for (int i = 0; i < lines.length; i++) {
			byte asterikscount = 0;
			char lineChars[] = lines[i].toCharArray();
			while (lineChars[asterikscount] == '*')
				asterikscount++;
			depth[i] = asterikscount;
			lines[i] = lines[i].substring(depth[i]).trim();
		}
		return depth;
	}

	private void processParams(Map params) {
		if (params.get(TREE_NAME) != null)
			treeName = (String) params.get(TREE_NAME);
		if (params.get(TREE_COLLAPSED_IMG) != null)
			collapseImg = (String) params.get(TREE_COLLAPSED_IMG);
		if (params.get(TREE_EXPANDED_IMG) != null)
			expandImg = (String) params.get(TREE_EXPANDED_IMG);
		if (params.get(TREE_LEAF_IMG) != null)
			leafImg = (String) params.get(TREE_LEAF_IMG);
		if (params.get(TREE_USE_COOKIES) != null)
			useCookies = (((String) params.get(TREE_USE_COOKIES))
					.equalsIgnoreCase("yes")) ? true : false;
		if (params.get(TREE_EXPANDED) != null)
			expanded = (((String) params.get(TREE_EXPANDED))
					.equalsIgnoreCase("yes")) ? true : false;
		if (params.get(TREE_USE_PAGENAME) != null)
			usePageName = (((String) params.get(TREE_USE_PAGENAME))
					.equalsIgnoreCase("yes")) ? true : false;
		parseLines(((String) params.get(PluginManager.PARAM_BODY)));
	}

	private void parseLines(String s) {
		lines = s.split("\n");
		/* filter out the empty lines */
		ArrayList temp = new ArrayList();
		for (int i = 0; i < lines.length; i++) {
			lines[i] = lines[i].trim();

			if ((lines[i] != null) && !(lines[i].equals(""))
					&& !(lines[i].equals("'"))) {
				temp.add(lines[i]);
			}
		}
		lines = new String[temp.size()];
		temp.toArray(lines);
	}

	private void processCookies(StringBuffer res) {
		if (this.useCookies) {
			Cookie cookies[] = context.getHttpRequest().getCookies();
			String value = null;
			if (cookies != null) {
				for (int i = 0; i < cookies.length; i++) {
					if (cookies[i].getName().equals(treeName)) {
						value = cookies[i].getValue();
					}
				}
			}
			// is TreeView altered is Size or no cookie ?
			if (value == null || value.length() != lines.length) {
				this.useCookies = false;
				processCookies(res);
			} else {
				states = new boolean[value.length()];
				char[] ex = value.toCharArray();
				// res.append("</br>Cookie Data: ");
				for (int i = 0; i < ex.length; i++) {
					if (ex[i] == '0')
						states[i] = false;
					else
						states[i] = true;
					// res.append(ex[i]);
				}
			}
		} else {
			states = new boolean[lines.length];
			states[0] = true;
			for (int i = 1; i < lines.length; i++) {
				if (expanded) {
					states[i] = true;
					continue;
				}
				// per depth nodes herausfinden und je nach expanded status
				// setzen
				if (depth[i] == 1)
					states[i] = true;
				else
					states[i] = false;
			}
		}
	}

	private class TreeNode {
		private String		nodeName;
		private boolean		isVisible;
		private ArrayList	childs	= null;
		private HTMLFactory	html	= new HTMLFactory();

		public TreeNode(String nodeName, boolean isVisible) {
			this.nodeName = nodeName;
			this.isVisible = isVisible;
		}

		public void addChild(TreeNode child) {
			if (childs == null) {
				childs = new ArrayList();
			}
			childs.add(child);
		}

		public boolean hasChilds() {
			return (childs != null);
		}

		public boolean isLeaf() {
			return (childs == null);
		}

		public boolean isVisible() {
			return isVisible;
		}

		public String toString() {
			StringBuffer res = new StringBuffer();
			if (childs != null) {
				res.append(html.openNode(nodeName, ((TreeNode) childs.get(0))
						.isVisible(), isVisible));
				for (int i = 0; i < childs.size(); i++) {
					res.append(((TreeNode) childs.get(i)).toString());
				}
				res.append(html.closeNode());
			} else
				res.append(html.appendLeaf(nodeName, isVisible));
			return res.toString();
		}
	}

	private class HTMLFactory {

		public String appendLeaf(String value, boolean selfVisible) {
			StringBuffer res = new StringBuffer();
			res.append(openTable(selfVisible));
			res.append(openTR());
			res.append(openTD());
			res.append(insertLeafImg());
			res.append(closeTD());
			res.append(openTD());
			res.append(parse(value) + "\n");
			// res.append(value+"\n");
			res.append(closeTD());
			res.append(closeTR());
			res.append(closeTable());
			return res.toString();
		}

		public String openNode(String value, boolean childsVisible,
				boolean selfVisible) {
			StringBuffer res = new StringBuffer();
			res.append(openTable(selfVisible));
			res.append(openTR());
			res.append(openTD());
			if (childsVisible)
				res.append(insertExpandImg());
			else
				res.append(insertCollapseImg());
			res.append(closeTD());
			res.append(openTD());
			res.append(parse(value) + "\n");
			// res.append(value+"\n");
			return res.toString();
		}

		public String closeNode() {
			StringBuffer res = new StringBuffer();
			res.append(closeTD());
			res.append(closeTR());
			res.append(closeTable());
			return res.toString();
		}

		public String openTR() {
			return "<TR>\n";
		}

		public String closeTR() {
			return "</TR>\n";
		}

		public String openTD() {
			return "<TD valign='top'>\n";
		}

		public String closeTD() {
			return "</TD>\n";
		}

		public String insertLeafImg() {
			return "<img  class=\"" + treeName + "Leaf\"  src=\"templates/"
					+ templateDir + "/img/" + leafImg + "\"/>\n";
		}

		public String insertCollapseImg() {
			return "<img  class=\"" + treeName + " NodeC\" src=\"templates/"
					+ templateDir + "/img/" + collapseImg + "\" onClick=\""
					+ treeName + "toggleTreeView(this)\"/>\n";
		}

		public String insertExpandImg() {
			return "<img  class=\"" + treeName + "NodeE\"  src=\"templates/"
					+ templateDir + "/img/" + expandImg + "\" onClick=\""
					+ treeName + "toggleTreeView(this)\"/>\n";
		}

		public String openTable(boolean isVisible) {
			String visible = (isVisible) ? "block" : "none";
			return "<TABLE class=\"" + treeName + "\" style=\"display:"
					+ visible + "\" border=0 cellspacing=0>\n<TBODY>\n";
		}

		public String closeTable() {
			return "</TBODY>\n</TABLE>\n";
		}

		private String parse(String s) {

			return context.getEngine().textToHTML(context, s);
		}
	}
}
