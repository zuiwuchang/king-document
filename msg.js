/* 使用 bootstrap 製作的 各種 模式 對話框 */
(function(g){
	"use strict";

	g.kingui = g.kingui || {};
	var ui = g.kingui;
	ui.NewMsg = ui.NewMsg || function(initObj){
		var jqElement = initObj.Element || $("body");
		var id = initObj.Id || "0";
		var btns = initObj.Btns;


		var id = "kingui-msg-" + id;
		var html = "<div>" + 
				"<button class='btn btn-default' data-toggle='modal' data-target='#" + id + "' style='display: none;'></button>" +
				"<div id='" + id + "' class='modal fade' role='dialog'>" +
				"<div class='modal-dialog'>" +
					"<div class='modal-content'>" +
						"<div class='modal-header'>" +
						"<button class='close' data-dismiss='modal'>&times;</button>" +
						"<h4 class='modal-title'></h4>" +
						"</div>" +

						"<div class='modal-body'>" +
							"<p></p>" +
						"</div>";
			if(btns && btns.length > 0){
				html += "<div class='modal-footer'>";
				for (var i = 0; i < btns.length; i++) {
					var btn = btns[i];
					html += "<button class='btn btn-default kingui-btn-" + i + "'>" + btn.Name + "</button>";
				}
				html += "</div>";
			}	
			html += 	"</div>" +
				"</div>" +
				"</div>" +
			"</div>";
		//jq
		var jq = $(html);
		var jqBtnShow = jq.find('button:first');
		var jqTitle = jq.find('.modal-title:first');
		var jqBody = jq.find('.modal-body:first').children('p:first');
		var jqFooter = jq.find('.modal-footer:first');
		var jqBtnCancel = jq.find('.close:last');

		jqElement.append(jq);

		var newObj = {
			Show:function(title,text,callback){
				jqTitle.html(title);
				jqBody.html(text);

				jqBtnShow.click();
			},
			Hide:function(){
				jqBtnCancel.click();
			},
		};

		if(btns){
			$.each(btns, function(i, btn) {
				var str = '.kingui-btn-' + i;
				jqFooter.find(str).click(function(event) {
					if(btn.Callback){
						btn.Callback.bind(newObj)();
					}else{
						newObj.Hide();
					}
				});	
			});
		}
		return newObj;
	};
})(this);