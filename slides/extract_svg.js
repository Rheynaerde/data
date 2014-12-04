function explicitlySetStyle (element) {
    var cSSStyleDeclarationComputed = getComputedStyle(element);
    var i, len, key, value;
    var computedStyleStr = "";
    for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
        key=cSSStyleDeclarationComputed[i];
        value=cSSStyleDeclarationComputed.getPropertyValue(key);
            computedStyleStr+=key+":"+value+";";
    }
    element.setAttribute('style', computedStyleStr);
}

function traverse(obj){
    var tree = [];
    tree.push(obj);
    if (obj.hasChildNodes()) {
        var child = obj.firstChild;
        while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
                var t = traverse(child);
                var i;
                for(i = 0; i < t.length; i++){
                    tree.push(t[i]);
                }
            }
            child = child.nextSibling;
        }
    }
    return tree;
}

function prepareSvgForExtraction(svgElement){
	var allElements = traverse(svgElement);
	var i = allElements.length;
	while (i--){
	    explicitlySetStyle(allElements[i]);
	}
}
