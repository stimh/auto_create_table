
var _id = "";
var partentid = "";
var id = "";
//查询条件
var search_init = "";
//显示条件
var show_init = "";
var pid = "";
var ue;
var pic = "";
var tname = "";
var priarray;
var priid = "";
var btn_add = false;
var btn_edit = false;
var btn_delete = false;
var btn_delete_all = false;
var btn_import = false;
var btn_export = false;
var btn_show = false;
var btn_ewm = false;
var btn_jingque = false;
var skey = ""; //查询key
var svalue = ""; //查询值
var init_id;
var issubmit=true; //是否可以提交

var search_key = "";
var show_range="";
var all_table_name="";
var arrdept;
var strarrdept="";
var sdeptid="";
$(document).ready(
	function() {
		_id = getQueryString("id");
		pid = getQueryString("id");
		priid = getQueryString("pid"); //权限id
		tname= getQueryString("tname"); //权限id
		
		//根据部门加载组织机构
	    sdeptid=deptid;

		
		table_search_new("lykj_role_privilege", "{$and:[{'id':" + priid + "},{'roleid':'" + roleid + "'}]}", "", 0, 0, "", function(data) {
			var  redata=eval("("+data+")");
			console.log(redata);
			show_range=redata[0].show_range;
		});
		
		

		table_search_new("lykj_role_privilege", "{$and:[{'pId':" + priid + "},{'roleid':'" + roleid + "'},{'type':'功能'}]}", "", 0, 0, "", function(data) {
			var redata = eval("(" + data + ")");
			for (var i = 0; i < redata.length - 1; i++) {
			var url = redata[i].url;
			if(url == "btn_add") {
			btn_add = true;
			} else if(url == "btn_edit") {
			btn_edit = true;
			} else if(url == "btn_delete") {
			btn_delete = true;
			} else if(url == "btn_import") {
			btn_import = true;
			} else if(url == "btn_export") {
			btn_export = true;
			} else if(url == "btn_show") {
			btn_show = true;
			}else if(url == "btn_ewm") {
			btn_ewm = true;
			}else if(url == "btn_jingque") {
			btn_jingque = true;
			btn_search_jingque();
			}else if(url == "btn_delete_all") {
			btn_delete_all = true;
			}else if(url == "btn_txt_import_div") {
			btn_txt_import = true;
			}
			}

			if(btn_add) {
			$("#btn_add").show();
			} else {
			$("#btn_add").hide();
			}

			if(btn_import) {
			$("#btn_import").show();
			$("#btn_mb_down").show();
			} else {
			$("#btn_import").hide();
			$("#btn_mb_down").hide();
			}
			
			if(btn_jingque) {
			$("#btn_jingque").show();
			} else {
			$("#btn_jingque").hide();
			}
			
			
			if(btn_delete_all) {
			$("#btn_delete_all").show();
			} else {
			$("#btn_delete_all").hide();
			}

			init_form();

		});
		
        //加载标题 仅用于字段有名称的
		table_return_id("lykj_table", "{}", "_id", _id, function(data) {
			var redata = eval("(" + data + ")");
			var title = redata[0].名称;
			$("title").html(title);
			$("#title").html(title);
			all_table_name=redata[0].表名;
			btn_pipei_all();
		});

	}
);


function init_form() {
	//初始化指标
	table_search_new("lykj_table", "{'partentid':'" + _id + "','是否显示':true}", "", 0, 0, "{'_id':1}", function(data) {
		var redata1 = eval("(" + data + ")");
		for (var i = 0; i < redata1.length - 1; i++) {
		var c1 = redata1[i].名称;
		var c7 = redata1[i].提示信息;
		var c5 = redata1[i].是查询时显示;
		var c4 = redata1[i].是否作为查询条件;
		var c3 = redata1[i].是否必填;
		var c6 = redata1[i].是否启用;
		var c2 = redata1[i].类型;
		var c12 = redata1[i].是否已存在;
		
		var min_num = redata1[i].数字最小值;
		var max_num = redata1[i].数字最大值;

		var min_date = redata1[i].日期最小值;
		var max_date = redata1[i].日期最大值;

		var select_list = redata1[i].select_list;
		var select_val = redata1[i].select_val;
		
		var tree_name= redata1[i].tree_name;
		var tree_fw= redata1[i].tree_fw;

		if(c4) {
		if(search_init == "") {
		search_init = "{'" + c1 + "':{$regex:'str',$option:'i'}}";
		} else {
		search_init = search_init + ",{'" + c1 + "':{$regex:'str',$option:'i'}}";
		}
		}

		if(c5) {
		if(show_init == "") {
		show_init = "'" + c1 + "':1";
		} else {
		show_init = show_init + ",'" + c1 + "':1";
		}
		}

		var guid = newGuid();
	    
		//TODO 添加 监测是否存在数据 仅text 中添加 后期完善其他
		if(c2 == "text") {
		if(c6){
		if(c3) {
		if(c12){
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  onblur=btn_check_isexit('"+tname+"','"+c1+"',this) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}else{
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' onblur=btn_check_isexit('"+tname+"','"+c1+"',this.val) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "'  /></div>");
		}
		}
		} else if(c2 == "number") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "' required=true min=" + min_num + " max=" + max_num + " /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "'  min=" + min_num + " max=" + max_num + " /></div>");
		}
		} else if(c2 == "tel") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "email") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "cdcard") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "url") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "'   /></div>");
		}
		}else if(c2 == "textarea") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea form-control' placeholder='" + c7 + "' required=true></textarea></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea form-control' placeholder='" + c7 + "' ></textarea></div>");
		}
		} else if(c2 == "file") {
		var guid = newGuid();
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class='form-control'  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "' required=true /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class='form-control'  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "'  /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		}
		} else if(c2 == "datetime") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker form-control' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker form-control' placeholder='" + c7 + "'  /></div>");
		}
		} else if(c2 == "select") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' ></select></div>");
		}
		//加载数据
		if(typeof (select_val) != "undefined") {
		for (var a = 0; a < select_list.length; a++) {
		$("#select_" + guid).append("<option value='" + select_val[a] + "'>" + select_list[a] + "</option>");
		}

		} else {
		for (var a = 0; a < select_list.length; a++) {
		$("#select_" + guid).append("<option value='" + select_list[a] + "'>" + select_list[a] + "</option>");
		}
		}

		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('render');
		} else if(c2 == "select_multiple") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control form-control'  id='select_" + guid + "' ></select></div>");
		}
		//加载数据
		if(typeof (select_val) != "undefined") {
		for (var b = 0; b < select_list.length; b++) {
		$("#select_" + guid).append("<option value='" + select_val[b] + "'>" + select_list[b] + "</option>");
		}

		} else {
		for (var b = 0; b < select_list.length; b++) {
		$("#select_" + guid).append("<option value='" + select_list[b] + "'>" + select_list[b] + "</option>");
		}
		}

		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('render');

		} else if(c2 == "editor") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		}

		ue = UE.getEditor(guid, {zIndex : 2000,
			autoHeightEnabled : false,
			autoFloatEnabled : false
		});

		}else if(c2 == "password") {
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "'  /></div>");
		}
		}else if(c2=="treelist-radio"){
		console.log("进入树形");
		if(c6){
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' class='form-control' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;    position: absolute;z-index: 10000; background-color: #fefefe;padding: 5px;height: auto;margin-top: -1px;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' class='form-control' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		}
		}
		
		}else if(c2=="treelist-checkbox"){
		console.log("进入树形");
		if(c6){
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		}
		}
		
		}else if(c2=="children"){
		var zdysjb=redata1[i].自定义数据表;
		var zdysjy=redata1[i].自定义数据源;
		var zdysjnum=redata1[i].自定义数据条数;
		if(c6){
		if(c3) {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'>" +
				"<div class='col-xs-12>'>"+c1+"<button class='mui-btn mui-btn-blue' onclick=btn_add_childern('"+zdysjb+"','"+zdysjy+"','"+guid+"')>增加</button></div>" +
				"<table class='table' id='table_"+guid+"'>" +
				"<theader id='theader_"+guid+"'></theader >" +
				"<tbody id='tbody_"+guid+"'></tbody>" +
				"</table>" +
				"</div>");
		} else {
		$("#modal_form_row").append("<div class='col-xs-12 m12 input-filed'>" +
				"<div class='col-xs-12>'>"+c1+"<button class='mui-btn mui-btn-blue' onclick=btn_add_childern('"+zdysjb+"','"+zdysjy+"','"+guid+"')>增加</button></div>" +
				"<table class='table' id='table_"+guid+"'>" +
				"<theader id='theader_"+guid+"'></theader >" +
				"<tbody id='tbody_"+guid+"'></tbody>" +
				"</table>" +
				"</div>");
		}
		}
		
		//加载表结构
		inittable_children(zdysjb,zdysjy,guid);
		
		}else if(c2=="dizhi"){
		$("#modal_form_row").append("<div class='row form-inline' style='margin:20px;'>"
        +"<div id='disSelect' data-role='form' type='dizhi' id='"+guid+"'>"
        +"    <label class='control-label' for='"+guid+"'>"+c1+"</label>"
        +"    <select class='form-control' id='province' data-province=''></select>"
        +"    <select class='form-control' id='city' data-city=''></select>"
        +"    <select class='form-control' id='county' data-county=''></select>"
        +" </div>"
        +"</div>");
		$("#disSelect").distpicker();
		}

		}
		
		$("#myform").html5Validate(function() {
			var tsxx = "";
			var tsvalue = "";
			var json = "";
			//表单保存
			var array = $("[data-role='form']");
			for (var i = 0; i < array.length; i++) {
			var type = array[i].type;
			//判断类型 如果为文本
			if(type == "text") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";

			}
			}

			//判断类型 如果为文本
			if(type == "select-one") {
			id = array[i].id;
			var selectid = id.replace("select_", "div_");
			name = $("[for='" + selectid + "']")[0].innerHTML;
			value = $("#" + id).val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}

			}

			if(type == "select-multiple") {
			id = array[i].id;
			var selectid = id.replace("select_", "div_");
			name = $("[for='" + selectid + "']")[0].innerHTML;
			value = $("#" + id).val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}

			}

			//判断类型 如果为文本
			if(type == "radio") {
			id = array[i].id;
			var radioname = array[i].name;
			name = $("[for='" + radioname + "']")[0].innerHTML;
			value = $("input:radio[name=" + radioname + "]:checked").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";

			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			//判断类型 如果为文本
			if(type == "checkbox") {
			id = array[i].id;
			var radioname = array[i].name;
			name = $("[for='" + radioname + "']")[0].innerHTML;
			var array_list = new Array();
			$("input[name='" + radioname + "']:checkbox").each(function() {
				if($(this).attr("checked")) {
				array_list.push($(this).val());
				}
			});
			var str = array_list.join(",");
			if(i == 0) {
			json = "'" + name + "':'" + str + "'";
			} else {
			json = json + ",'" + name + "':'" + str + "'";

			}
			}

			//判断类型 如果为文本
			if(type == "password") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			//判断类型 如果为文本
			if(type == "email") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			//判断类型 如果为文本
			if(type == "tel") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			//判断类型 如果为文本
			if(type == "number") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':" + value;
			} else {
			json = json + ",'" + name + "':" + value;
			}
			}

			//判断类型 如果为文本
			if(type == "textarea") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("textarea[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			//如果是文件
			if(type == "hidden") {
			id = array[i].id;
			var lableid = id.replace("pic_hide", "")
			name = $("[for='" + lableid + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			var array_val=new Array();
			array_val=value.split(",");
			arry_deptid=JSON.stringify(array_val);
			if(array_val.length>1){
			if(i == 0) {
			json = "'" + name + "':"+arry_deptid;
			} else {
			json = json + ",'" + name + "':"+arry_deptid;
			}
			
			}else{
			if(i == 0) {
			json = "'" + name + "':" + arry_deptid;
			} else {
			json = json + ",'" + name + "':" + arry_deptid;
			}
			}
			
			}

			//如果是编辑器
			if(typeof (type) == "undefined") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = UE.getEditor(id).getContent();
			console.log("編輯器内容", value);
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}
			}

			if(type == "date") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':'" + value + "'";
			} else {
			json = json + ",'" + name + "':'" + value + "'";
			}

			if(name == "运行日期") {
			tsxx = value;
			}

			}
			
			//判断类型 如果为文本
			if(type == "cdcard") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':" + value;
			} else {
			json = json + ",'" + name + "':" + value;
			}
			}
			
			if(type == "url") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			value = $("input[id='" + id + "']").val();
			if(i == 0) {
			json = "'" + name + "':" + value;
			} else {
			json = json + ",'" + name + "':" + value;
			}
			}
			
			if(type == "dizhi") {
			id = array[i].id;
			name = $("[for='" + id + "']")[0].innerHTML;
			var provice=$("#"+id +" #province").val();
			var city=$("#"+id +" #city").val();
			var county=$("#"+id +" #county").val();
			var str_address=provice+","+city+","+county;
			if(i == 0) {
			json = "'" + name + "':'" + str_address+"'";
			} else {
			json = json + ",'" + name + "':'" + str_address+"'";
			}
			}
			
			}

			if(issubmit){
			var datetime = new Date();
			datetime = datetime.format("yyyy-MM-dd");
			if(tname=="user"){
			if(user_type=="admin_all"){
			json = json + ",'partentid':'" + pid + "'";
			json = json + ",'userid':'" + userid + "'";
			json = json + ",'time':'" + datetime + "'";
			json = "{$set:{" + json + "}}";
			
			}else{
			
			json = json + ",'partentid':'" + pid + "'";
		    json = json + ",'compid':'" + compid + "'";
		    json = json + ",'dept':'" + udept+"'"; //部门
			json = json + ",'userid':'" + userid + "'";
			json = json + ",'time':'" + datetime + "'";
			json = "{$set:{" + json + "}}";
			}
			
			}else{

			arry_deptid=JSON.stringify(deptid);
			arry_dept=JSON.stringify(udept);
			if(typeof(arry_deptid)=="undefined"){
			arry_deptid=JSON.stringify("");
			}
			if(typeof(arry_dept)=="undefined"){
			arry_dept=JSON.stringify("");
			}

			json = json + ",'partentid':'" + pid + "'";
			json = json + ",'userid':'" + userid + "'";
			json = json + ",'compid':'" + compid + "'";
			json = json + ",'deptid':"+arry_deptid; //查看范围
			json = json + ",'dept':'" + arry_dept+"'"; //部门
			json = json + ",'time':'" + datetime + "'";
			json = "{$set:{" + json + "}}";
			}
			var json_filed = "{'_id':'" + update_id + "'}";
			console.log(json);
			// 提交表单
			$('#myform').ajaxSubmit({type : 'post',
				url : 'userAction_table_update_new.action',
				data : {'table_name' : tname,
					'json' : json_filed,
					'json_filed' : json
				},
				success : function(data) { // data 保存提交后返回的数据，一般为 json 数据
					btn_toast("提交成功", "success", "top", 2);
					$("#modal_table_add").modal('hide');
					$('#table').bootstrapTable('refresh');
				},
				error : function() {
					btn_toast("提交异常", "danger", "top", 2);
				}
			});
			}else{
			       btn_toast("请检查数据后提交！", "danger", "top", 2);
			}
			
			return false;
		});
	});
}

var deleteid = "";

function btn_delete(id) {
	deleteid = id;
	$('#modal_delete').modal('show');
}

function btn_delete_quren() {
	var json = "{'_id':'" + deleteid + "'}";
	table_delete_new("lykj_table_data", json, function(data) {
		$("#modal_delete").modal('hide');
		$("#table").bootstrapTable('refresh');
	});
}

function initTable() {
	//pid

	table_search_new("lykj_table", "{$and:[{'partentid':'" + _id + "'},{'是否查询时显示':true}]}", "", 0, 0, "{'_id':1}", function(data) {
		var redata1 = eval("(" + data + ")");
		var myColumns = new Array();
		for (var i = 0; i < redata1.length - 1; i++) {
		myColumns.push({"field" : redata1[i].名称,
			"title" : redata1[i].名称,
		});
		}
		
		myColumns.push({'title' : '操作',
			'field' : '#',
			'align' : 'center',
			'width' : '200',
			'formatter' : function(value, row, index) {
				var all = "";
				d = "<a class='mui-btn mui-btn-red' href='javascript:;' onclick=btn_delete_new('" + row._id + "')>删除</a>";
				e = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=btn_update('" + row._id + "')>编辑</a>";
				s = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=click_btn_show('" + row._id + "')>查看</a>";
				q = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=btn_ewm_init('" + row._id + "','" + row.name + "')>二维码</a>";
				
				if(btn_delete) {
				all = all + d;
				}

				if(btn_edit) {
				all = all + e;
				}

				if(btn_show) {
				all = all + s;
				}
				
				if(btn_ewm) {
				all = all + q;
				}
				console.log(all);
				return all;
			}
		});
         
		//先销毁表格  
		$('#table').bootstrapTable('destroy');
		//初始化表格,动态从服务器加载数据  
		$("#table").bootstrapTable({method : "get", //使用get请求到服务器获取数据  
			url : surl + "userAction_table_search_new_table_new.action", //获取数据的Servlet地址  
			striped : true, //表格显示条纹  
			pagination : true, //启动分页  
			cardView : false, //用户移动设备
			pageSize : 10, //每页显示的记录数  
			currentPage : 1, //当前第几页  
			pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
			search : true, //是否启用查询
			searchOnEnterKey : true, //回车查询
			showColumns : true, //显示下拉框勾选要显示的列  
			showRefresh : true, //显示刷新按钮  
			sidePagination : "server", //表示服务端请求 ,  
			silent : true,
			cache: false,
        	showToggle:true, //显示切换按钮来切换表/卡片视图。
			//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
			//设置为limit可以获取limit, offset, search, sort, order  
			queryParamsType : "undefined",
			queryParams : function queryParams(params) {
				//设置查询参数  
				str = params.searchText;
				var str_search = "";
				var search_show="";
				var arry_deptid=deptid;
				arry_deptid=JSON.stringify(arry_deptid);
				if(show_range=="all"){
				//search_show="'compid':'"+compid+"'";
				search_show="";
				}else if(show_range=="dept"){
				if(user_type=="admin_all"){
				search_show="";
				}
				else if(user_type=="admin"){
				search_show="'compid':'"+compid+"'";
				}else{
				if(typeof(arry_deptid)=="undefined"||arry_deptid==""||arry_deptid=="null"){
				search_show="'compid':'"+compid+"','dept':{$in:[]}";
				
				}else{
				
				search_show="'compid':'"+compid+"','dept':{$in:"+arry_deptid+"}";
				}
 				
				}
				
				}else if(show_range=="self"){
				search_show="'userid':'"+userid+"'";
				}else{
				search_show="'compid':'"+compid+"'";
				}
				search_show="{"+search_show+"}";
                console.log(search_show);
				if(tname == "lykj_table_data") {
				var ssearch_init = search_init.replace(/str/g, str);
				if(typeof (str) != "undefined") {
				ssearch_init = search_init.replace(/str/g, str);
				str_search = "{$and:[{'partentid':'" + pid + "'},"+search_show+",{$or:[" + ssearch_init + "]}]}";
				} else {
				str_search = "{$and:[{'partentid':'" + pid + "'},"+search_show+"]}";
				}

				} else {
				var ssearch_init = search_init.replace(/str/g, str);
				if(typeof (str) != "undefined") {
				ssearch_init = search_init.replace(/str/g, str);
				str_search = "{$and:[{$or:[" + ssearch_init + "]},"+search_show+"]}";
				} else {
				str_search = search_show;
				}
				}
				
				var param = {currentPage : params.pageNumber,
					pageSize : params.pageSize,
					table_name : tname,
					str_search : str_search,
					str_sort : "{'time':-1}"
				};
				return param;
			},
			onLoadSuccess : function() { //加载成功时执行  
				console.log("加载成功");
			},
			onLoadError : function() { //加载失败时执行  
				console.log("加载数据失败", {time : 1500,
					icon : 2
				});
			},
			toolbar : '#toolbar', //工具按钮用哪个容器
			showExport : btn_import, //是否显示导出按钮  
			exportDataType : "all", //basic', 'all', 'selected'.
			columns : myColumns
		});
	})
}



var update_id = "";
var imgheight = "120px";
function btn_update(id) {
	$("#btn_submit").show();
	$("[data-role='form']").attr("disabled", false);
	$("#modal_table_add").modal('show');
	if(id == "0") {
	update_id = "";
	$("[data-role='form']").each(
		function() {
			$(this).val("");
		}
	);
	ue.setContent('', false);
	$(".div_pic").empty();
	btn_open_modal('modal_table_add');
	return;
	} else {
	update_id = id;
	$("[data-role='form']").each(
		function() {
			$(this).val("");
		}
	);
	$(".div_pic").empty();
	table_return_id(tname, "", "_id", id, function(data) {
		var redata = eval("(" + data + ")");
		var obj = redata[0];
		for (var key in obj) {
		var objs = key;
		var ssss = $("[data-name='" + key + "']");
		if(ssss.length > 0) {
		var osss = ssss.attr("type");
		sss = ssss[0].type;
		var eid = ssss.attr("id");
		console.log(sss + ":" + eid);
		if(typeof (sss) != "undefined") {
		if(sss == "select-multiple") {
		var arr = obj[key].split(',');
		$('.selectpicker').selectpicker('val', arr);
		} else if(sss == "hidden") {
		var arr = eid.split("pic_hide");
		var divname = "pics_" + arr[1];

		var svalue = obj[key];
		var arr1=svalue;
		if(arr1.length>0){

		}else{
		arr1 = svalue.split(",");
		}
		//var arr1 = svalue.split(",");
		if(arr1.length>=1){
		for (var i = 0; i < arr1.length; i++) {
		var sval = arr1[i];
		var guid = newGuid();
		if(sval.indexOf(".txt") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/txt.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		
		} else if(sval.indexOf(".docx") != -1 || sval.indexOf(".doc") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/word.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		} else if(sval.indexOf(".xls") != -1 || sval.indexOf(".xlsx") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/excel.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		} else if(sval.indexOf(".png") != -1 || sval.indexOf(".bmp") != -1 || sval.indexOf(".jpg") != -1 || sval.indexOf(".gif") != -1 || sval.indexOf(".jpeg") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
			+ "<img id='" + guid + "' src='" + sval + "'  style=height:120px;width:120px   id='" + guid + "'  />"
			+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
			+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
			+ "</div>");
		} else {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/wz.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		}

		}
		}




		$("[data-name='" + key + "']").val(obj[key]);

		} else if(sss == "select-one") {
		$("select[data-name='" + key + "']").val(obj[key]);
		} else if(sss=="dizhi"){
		var arr_dizhi=obj[key];
		arr_dizhi=arr_dizhi.split(",");
		$("#province").attr("data-province",arr_dizhi[0]);
		$("#city").attr("data-city",arr_dizhi[1]);
		$("#county").attr("data-county",arr_dizhi[2]);
	    $("#disSelect").distpicker();
		} else {
		$("[data-name='" + key + "']").val(obj[key]);
		$("[data-name='" + key + "']").html(obj[key]);
		}
		} else {
		if(osss == "editor") {
		if(UE.getEditor(eid)) {
		UE.getEditor(eid).setContent(obj[key], false);
		}
		} else {
		}
		}

		}

		}
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('render');
		btn_open_modal('modal_table_add');
	});
	}

}


//模版下载
function btn_mb_down_div() {
	var str = "";
	var tname = "lykj_table";
	var str_search = "{'partentid':'" + pid + "'}";
	var json_filed = "{'名称':1,'类型':1,'自定义数据表':1,'自定义数据源':1,'自定义数据条数':1}";
	$.post("userAction_table_generate_excel_children.action", {"table_name" : tname,
		"str_search" : str_search,
		"json_filed" : json_filed
	}, function(data) {
		$("#btn_excel_url").attr("href", "file/" + data);
		$("#div_modal_mb").modal();
		$("#div_modal_mb").modal('open');
	});
}

//导入
function btn_import_div() {
	var str = "";
	$("#div_modal_mb_upload").modal();
	$("#div_modal_mb_upload").modal('open');
}


//导入
function btn_txt_import_div() {
	var str = "";
	$("#div_modal_txt_upload").modal();
	$("#div_modal_txt_upload").modal('open');
}

//生成excel
function btn_start_import() {
	var datetime = new Date();
	datetime = datetime.format("yyyy-MM-dd");
	var tname = this.tname;
	var json = "{'_id':''}";
	var json_filed = "'name':'" + name + "'";
	json_filed = json_filed + ",'partentid':'" + pid + "'";
	json_filed = json_filed + ",'userid':'" + userid + "'";
	json_filed = json_filed + ",'compid':'" + compid + "'";
	json_filed = json_filed + ",'time':'" + datetime + "'";
	json_filed = "{" + json_filed + "}";
	var data = new FormData();
	data.append('file', $('#mb_upload_file')[0].files[0]);
	data.append('table_name', tname);
	data.append('json', json);
	data.append('json_filed', json_filed);
	$.ajax({url : 'userAction_table_import_new_children.action',
		type : 'POST',
		data : data,
		processData : false, // 告诉jQuery不要去处理发送的数据  
		contentType : false // 告诉jQuery不要去设置Content-Type请求头  
	}).done(function(ret) {
		console.log(ret);
		if(ret) {
		//$("#div_modal_mb_upload").modal('hide');
		initTable();
		} else {
		//$("#div_modal_mb_upload").modal('hide');
		initTable();
		}
		$("#fhtext").val(ret);
	});
}


function btn_start_import_txt() {
	var datetime = new Date();
	datetime = datetime.format("yyyy-MM-dd");
	var tname = this.tname;
	var json = "{'_id':''}";
	var json_filed = "'name':'" + name + "'";
	json_filed = json_filed + ",'partentid':'" + pid + "'";
	json_filed = json_filed + ",'userid':'" + userid + "'";
	json_filed = json_filed + ",'compid':'" + compid + "'";
	json_filed = json_filed + ",'time':'" + datetime + "'";
	json_filed = "{" + json_filed + "}";
	var data = new FormData();
	data.append('file', $('#txt_upload_file')[0].files[0]);
	data.append('table_name', tname);
	data.append('json', json);
	data.append('json_filed', json_filed);
	$.ajax({url : 'userAction_txt_upload.action',
		type : 'POST',
		data : data,
		processData : false, // 告诉jQuery不要去处理发送的数据  
		contentType : false // 告诉jQuery不要去设置Content-Type请求头  
	}).done(function(ret) {
		console.log(ret);
		if(ret) {
		//$("#div_modal_mb_upload").modal('hide');
		initTable();
		} else {
		//$("#div_modal_mb_upload").modal('hide');
		initTable();
		}
		//$("#fhtext").val(ret);
	});
}


function click_btn_show(id) {
	$("#modal_table_add").modal('show');
	if(id == "0") {
	update_id = "";
	$("[data-role='form']").each(
		function() {
			$(this).val("");
		}
	);
	ue.setContent('', false);
	$(".div_pic").empty();
	btn_open_modal('modal_table_add');
	return;
	} else {
	update_id = id;
	$("[data-role='form']").each(
		function() {
			$(this).val("");
		}
	);
	$(".div_pic").empty();
	table_return_id(tname, "", "_id", id, function(data) {
		var redata = eval("(" + data + ")");
		var obj = redata[0];
		for (var key in obj) {
		var objs = key;
		var ssss = $("[data-name='" + key + "']");
		if(ssss.length > 0) {
		var osss = ssss.attr("type");
		sss = ssss[0].type;
		var eid = ssss.attr("id");
		console.log(sss + ":" + eid);
		if(typeof (sss) != "undefined") {
		if(sss == "select-multiple") {
		var arr = obj[key].split(',');
		$('.selectpicker').selectpicker('val', arr);
		} else if(sss == "hidden") {
		var arr = eid.split("pic_hide");
		var divname = "pics_" + arr[1];

		var svalue = obj[key];
		var arr1 = svalue.split(",");
		if(arr1.length>=1){
		for (var i = 0; i < arr1.length; i++) {
		var sval = arr1[i];
		var guid = newGuid();
		if(sval.indexOf(".txt") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/txt.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		
		} else if(sval.indexOf(".docx") != -1 || sval.indexOf(".doc") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/word.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		} else if(sval.indexOf(".xls") != -1 || sval.indexOf(".xlsx") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/excel.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		} else if(sval.indexOf(".png") != -1 || sval.indexOf(".bmp") != -1 || sval.indexOf(".jpg") != -1 || sval.indexOf(".gif") != -1 || sval.indexOf(".jpeg") != -1) {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
			+ "<img id='" + guid + "' src='" + sval + "'  style=height:120px;width:120px   id='" + guid + "'  />"
			+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
			+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
			+ "</div>");
		} else {
		$("#" + divname).append("<div id='del" + guid + "' style=height:120;width:120px;float:left;margin:3px;>"
				+ "<img id='" + guid + "' src='img/wz.png'  style=height:120px;width:120px   id='" + guid + "'  />"
				+ "<div style='position:relative;bottom:35px;left:2px;right:0px' height:45px>"
				+ "<button class='mui-btn mui-btn-red' onclick=btn_file_delete('" + guid + "','" + eid + "','" + sval + "') >删除</button>"
				+ "</div>");
		}

		}
		}




		$("[data-name='" + key + "']").val(obj[key]);

		} else if(sss == "select-one") {
		$("select[data-name='" + key + "']").val(obj[key]);
		} else {
		$("[data-name='" + key + "']").val(obj[key]);
		$("[data-name='" + key + "']").html(obj[key]);
		}
		} else {
		if(osss == "editor") {
		if(UE.getEditor(eid)) {
		UE.getEditor(eid).setContent(obj[key], false);
		}
		} else {
		}
		}

		}

		}
		$('.selectpicker').selectpicker('refresh');
		$('.selectpicker').selectpicker('render');
		btn_open_modal('modal_table_add');
	});
	}


	
	$("#btn_submit").hide();
	$("[data-role='form']").attr("disabled", true);
}


var deleteid = "";
function btn_delete_new(id) {
	deleteid = id;
	$("#modal_delete").modal({
	backdrop : 'static'
	});

}

function btn_delete_quren() {
	var json = "{'_id':'" + deleteid + "'}";
	table_delete_new(tname, json, function(data) {
		$("#modal_delete").modal('hide');
		$("#table").bootstrapTable('refresh');
	});
}


function btn_file_delete(id,valname,src)
{
$("#"+id).remove();
$("#del"+id).remove();
var ss = $("#"+valname).val();
var array = ss.split(",");

for(var i=0;i<array.length;i++)
{
if(array[i]==src)
{
array.splice(i,1);
}
}
ss =array.join(",");
$("#"+valname).val(ss);
}


//检查是否已存在该数据
function btn_check_isexit(tname,key,$this){
var sval=$($this).val();
var json="{'"+key+"':'"+sval+"'}";
table_count(tname,json,"",function(data){
if(data>0){
issubmit=false;
$($this).parent().addClass("has-error");
$($this).val("");
$($this).focus();
}else{
$($this).parent().removeClass("has-error");
issubmit=true;
}
});
	
}

var treeid;
var inputid;
var newCount = 1;
function showMenu(id,tname,tree_fw) {
	inputid=id;
	var cityObj = $("#s_"+id);
	var divid="tree_"+id;
	var cityOffset = $("#s_"+id).offset();
	$("#"+divid).css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	$("body").bind("mousedown", onBodyDown);
	
	var setting = {
			view: {
				selectedMulti: false
			},
			check: {
				enable: true,
				chkboxType:{ "Y" : "s", "N" : "ps" }
			},
			data: {
				simpleData: {
					enable: true,
					id:"id",
					pId:"pId",
					url:'url',
					name:'name',
					_id:'_id',
					type:'type',
					weight:'weight'
				}
			},
			edit: {
				enable: false,
				
			},
			callback: {
			onCheck: onCheck,
		    }
		};
	
	zNodes1 =[];
	var json="";
	console.log(json);
	var sort="{'pId':1,'weight':1}";
	if(user_type=="admin"){
	json="{'compid':'"+compid+"'}";
	table_search_new(tname,json,"",0,0,sort,function(data){
		var redata=eval("("+data+")");
		for(var i=0;i<redata.length-1;i++){
		var aa=redata[i];
		var id=aa.id;
		zNodes1[i]=redata[i];
		}
		if(zNodes1.length==0){
		zNodes1 =[{id:1,pId:0,name:"默认名称",url:"#",_id:'0'}]
		}
		treeid=$.fn.zTree.init($("#"+divid), setting, zNodes1);
		treeid.expandAll(true);
	});
	}else{
	
	if(tree_fw=="all"){
	json="{'compid':'"+compid+"'}";
	table_search_new(tname,json,"",0,0,sort,function(data){
		var redata=eval("("+data+")");
		for(var i=0;i<redata.length-1;i++){
		var aa=redata[i];
		var id=aa.id;
		zNodes1[i]=redata[i];
		}
		if(zNodes1.length==0){
		zNodes1 =[{id:1,pId:0,name:"默认名称",url:"#",_id:'0'}]
		}
		treeid=$.fn.zTree.init($("#"+divid), setting, zNodes1);
		treeid.expandAll(true);
	});
	}
	
	if(tree_fw="dept"){
	json="{'compid':'"+compid+"'}";
	table_search_new("lykj_organ",json,"",0,0,sort,function(data){
	var redata=eval("("+data+")");
	console.log(sdeptid);
	for(var i=0;i<redata.length-1;i++){
	var _id=redata[i]._id;
	var suserid=redata[i].userid;
	console.log(_id);
	if(sdeptid.indexOf(_id)!=-1||suserid==userid){
	var aa=redata[i];
	zNodes1.push(redata[i]);
	var id=aa.id;
	if(id>newCount){
	newCount=id;
	}
	}
	}
	treeid=$.fn.zTree.init($("#"+divid), setting, zNodes1);
	treeid.expandAll(true);
	})

	}
	
	
	}
	
	
	
	
	$("#div_tree_"+id).toggle();
		
}



function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

var user_dept=new Array();
function onCheck(e, treeId, treeNode) {
	user_dept=new Array();
	nodes = treeid.getCheckedNodes(true);
	v = "";
	s = "";
	var sspid=0;
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i]._id + ",";
		s += nodes[i].name + ",";
		if(i==0){
		sspid=nodes[i].pId;
		}else{
		if(sspid<nodes[i].pId){
		}else{
		sspid=nodes[i].pId;
		}
		}
	}
	
	for (var i=0, l=nodes.length; i<l; i++) {
	var spid=nodes[i].pId;
	if(sspid==spid){
	var dept=nodes[i]._id;
	user_dept=dept;
	}
    }
	
	//user_dept=JSON.stringify(user_dept);
	console.log(user_dept);
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	$("#"+inputid).val(v);
	$("#s_"+inputid).val(s);
}



//查找指标
function btn_search_jingque(){
var str_search="";
    str_search="{'partentid':'"+_id+"','是否作为查询条件':true}";
	 table_search_new("lykj_table",str_search,"",0,0,"",function(data){
		 var redata=eval("("+data+")");
		 console.log(redata);
		 $("#dt_search").empty();
		 for(var i=0;i<redata.length-1;i++){
		 var type=redata[i].类型;
		 if(type=="number"){
		 $("#dt_search").append("<div class='col s12 m12'><span id=t"+redata[i]._id+">"+redata[i].名称+"</span>:"
        +"<div class='input-field inline'>"
        +"<input id='sss"+redata[i]._id+"' placeholder='最小值' data-type='search' type='number'  class='validate' />"
        +"</div>"
        +"<div class='input-field inline'>"
        +"<input id='eee"+redata[i]._id+"' placeholder='最大值' data-type='search' type='number' class='validate' />"
        +"</div>"
        +"</div>");
		 }else if(type=="datetime"){
		  $("#dt_search").append("<div class='col s12 m12'><span id=t"+redata[i]._id+">"+redata[i].名称+"</span>:"
        +"<div class='input-field inline'>"
        +"<input id='sss"+redata[i]._id+"' data-type='search' type='date' class='validate'>"
        +"</div>"
        +"<div class='input-field inline'>"
        +"<input id='eee"+redata[i]._id+"' data-type='search' type='date' class='validate'>"
        +"</div>"
        +"</div>");
		 }else{
		 $("#dt_search").append("<div class='col s12 m6'><span id=t"+redata[i]._id+">"+redata[i].名称+"</span>:"
        +"<div class='input-field inline'>"
        +"<input id='"+redata[i]._id+"' data-type='search' type='text' class='validate'>"
        +"</div>"
        +"</div>");
		 }
		 }
	 }); 
}



function btn_more()
{
$("#modal_search").modal();
$("#modal_search").modal('show');
}

//精确查找
function btn_search_jq(){
currentPage=1;
$("#thead").empty();
$("#tbody").empty(); 
var array_search=new Array();
$("input[data-type='search']").each(function(){
var id=$(this).attr("id");
array_search.push(id);
});

var search_array=new Array();
for(var i=0;i<array_search.length;i++){
var vvalue=$("#"+array_search[i]).val();

var type=$("#"+array_search[i]).attr("type");

if(vvalue.length>0){
if(type=="number"||type=="date"){
if(array_search[i].indexOf("sss")>-1){
var sss=array_search[i].replace("sss","");
var vtext=$("#t"+sss).html();
search_array.push("{'"+vtext+"':{$gte:'"+vvalue+"'}}");
}

if(array_search[i].indexOf("eee")>-1){
var eee=array_search[i].replace("eee","");
var vtext=$("#t"+eee).html();
search_array.push("{'"+vtext+"':{$lte:'"+vvalue+"'}}");
}
}else{
var vtext=$("#t"+array_search[i]).html();
search_array.push("{'"+vtext+"':{$regex:'"+vvalue+"',$options:'i'}}");
}
}

}

var str_search=search_array.join(",");
if(str_search==""){
str_search="{$and:[{'partentid':'"+pid+"'}]}";
}else{
if(tname=="lykj_table_data"){

str_search="{$and:[{'partentid':'"+pid+"'},"+str_search+"]}";
}else{

str_search="{$and:["+str_search+"]}";
}

}


var json_filed="{"+show_init+"}";
var sort="{'_id':-1}";

var arr = [];
var arr1 = [];
initTable_jq(str_search,json_filed);
$("#modal_search").modal('hide');
}  


function initTable_jq(str_search,json_filed) {
	//pid
	table_search_new("lykj_table", "{$and:[{'partentid':'" + _id + "'},{'是否查询时显示':true}]}", "", 0, 0, "{'_id':1}", function(data) {
		var redata1 = eval("(" + data + ")");
		var myColumns = new Array();
		for (var i = 0; i < redata1.length - 1; i++) {
		myColumns.push({"field" : redata1[i].名称,
			"title" : redata1[i].名称,
		});
		}
		
		myColumns.push({'title' : '操作',
			'field' : '#',
			'align' : 'center',
			'width' : '200',
			'formatter' : function(value, row, index) {
				var all = "";
				d = "<a class='mui-btn mui-btn-red' href='javascript:;' onclick=btn_delete_new('" + row._id + "')>删除</a>";
				e = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=btn_update('" + row._id + "')>编辑</a>";
				s = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=click_btn_show('" + row._id + "')>查看</a>";
				q = "<a class='mui-btn mui-btn-blue' href='javascript:;' onclick=btn_ewm_init('" + row._id + "','" + row.名称 + "')>二维码</a>";
				
				if(btn_delete) {
				all = all + d;
				}

				if(btn_edit) {
				all = all + e;
				}

				if(btn_show) {
				all = all + s;
				}
				
				if(btn_ewm) {
				all = all + q;
				}
				console.log(all);
				return all;
			}
		});
        
		//先销毁表格  
		$('#table').bootstrapTable('destroy');
		//初始化表格,动态从服务器加载数据  
		$("#table").bootstrapTable({
			method : "get", //使用get请求到服务器获取数据  
			url : surl + "userAction_table_search_new_table_new.action", //获取数据的Servlet地址  
			striped : true, //表格显示条纹  
			pagination : true, //启动分页  
			cardView : false, //用户移动设备
			pageSize : 10, //每页显示的记录数  
			currentPage : 1, //当前第几页  
			pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
			search : true, //是否启用查询
			searchOnEnterKey : true, //回车查询
			showColumns : true, //显示下拉框勾选要显示的列  
			showRefresh : true, //显示刷新按钮  
			sidePagination : "server", //表示服务端请求 ,  
			silent : true,
			//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
			//设置为limit可以获取limit, offset, search, sort, order  
			queryParamsType : "undefined",
			queryParams : function queryParams(params) {
				var param = {currentPage : params.pageNumber,
					pageSize : params.pageSize,
					table_name : tname,
					str_search : str_search,
					str_sort : "{'time':-1}"
				};
				return param;
			},
			onLoadSuccess : function() { //加载成功时执行  
				console.log("加载成功");
			},
			onLoadError : function() { //加载失败时执行  
				console.log("加载数据失败", {time : 1500,
					icon : 2
				});
			},
			toolbar : '#toolbar', //工具按钮用哪个容器
			showExport : btn_import, //是否显示导出按钮  
			exportDataType : "all", //basic', 'all', 'selected'.
			columns : myColumns
		});
	})
}


//匹配所有数据
function btn_pipei_all(){
var json="{'partentid':'"+_id+"'}";	
table_count(tname,"","",function(data){
if(data>0){
//初始化表
initTable();

}else{
//根据配置加载表
mui.toast("处理中...",15);
table_search_new_tb("lykj_table", "{'partentid':'" + _id + "'}", "{}", 0, 0, "", function(data) {
var redata=eval("("+data+")");
var ziduanlist="";
//判断是否为外部数据
for(var i=0;i<redata.length-1;i++){
var wbsj=redata[i].外部数据;
var ly_table=wbsj.来源表ID;
var zjmc=redata[i].名称;
if(typeof(wbsj)!="undefined"&&ly_table!="请选择"){
var ly_table=wbsj.来源表ID;
var ly_table_zhiduan=wbsj.来源表字段;
var tiaojian=wbsj.条件;
var tiaojian_zhi=wbsj.条件值;
var mb_table=wbsj.目标表ID;
var mb_table_ziduan=wbsj.目标表字段;
var zhi=wbsj.值;
var gongshi=redata[i].公式;
/*for(var a=0;a<redata.length-1;a++){
var wbsj1=redata[a].外部数据;
var ly_table1=wbsj1.来源表ID;
var zhi=wbsj1.值;
if(a==0){
if(ly_table==ly_table1){
ziduanlist="'"+zhi+"':1";
}

}else{
if(ly_table==ly_table1){
ziduanlist=ziduanlist+",'"+zhi+"':1";
}
}
}*/
ziduanlist="'"+zhi+"':1";
if(i==0){

if(ly_table==mb_table&&ly_table!=_id){
table_return_id_tb("lykj_table", "{}", "_id", ly_table, function(data) {
	var redata = eval("(" + data + ")");
	var locan_tname=redata[0].表名;
	//查找数据
	table_search_new_tb(locan_tname,"","{"+ziduanlist+"}",0,0,"",function(data){
	var redata=eval("("+data+")");
	for(var y=0;y<redata.length-1;y++){
	var alldata=redata[y];
	alldata.partentid=_id;
	alldata.compid=compid;
	alldata.userid=userid;
	alldata.username=username;
	delete alldata._id;
	alldata=JSON.stringify(alldata);
	
	var reg = new RegExp( '"' , "g" );
	
	var alldata = alldata.replace( reg , '\'' );
	var json_filed=alldata;
	table_update_new_tb(all_table_name,"{'_id':''}",json_filed,function(){
		
	});
	
	}
    console.log("第一条结束");
	});
});

}
}else{
console.log("第"+i+"条开始");
table_return_id_tb("lykj_table", "{}", "_id", ly_table, function(data) {
	var redata = eval("(" + data + ")");
	var locan_tname=redata[0].表名;
	//根据本表的字段匹配数据
	//获取所有本表的字段
	var json="";
	var json_filed="{'"+ly_table_zhiduan+"':1}";
	table_search_new_tb(locan_tname,json,json_filed,0,0,"",function(data){
	var redata=eval("("+data+")");
	for(var p=0;p<redata.length-1;p++){
	var allobj=redata[p];
	for(var key in allobj){
	if(key==ly_table_zhiduan){
	var kval=allobj[key];
	//判断条件
	var arrmap=getNum(kval,true);
	kval=arrmap[arrmap.length-1];
	var lid=allobj["_id"];
	var json2="{'"+mb_table_ziduan+"':{$regex:'"+kval+"',$options:'i'}}";
	var json_filed2="{"+ziduanlist+"}";
	table_return_id_tb("lykj_table", "{}", "_id",mb_table,function(data) {
	var redata=eval("("+data+")");	
	var mb_tname=redata[0].表名;
	//是否存在条件值
	if(typeof(tiaojian_zhi)!="undefined"&&tiaojian_zhi!=""){
	var json3="{$and:[{'"+mb_table_ziduan+"':{$regex:'"+kval+"',$options:'i'}},{'"+mb_table_ziduan+"':{$regex:'"+tiaojian_zhi+"',$options:'i'}}]}";
	var json_filed3="{"+ziduanlist+"}";
	console.log(json3);
	console.log(json_filed3);
	table_search_new_tb(mb_tname,json3,json_filed3,0,0,"",function(data){
		var redata=eval("("+data+")");
		var allsum=0.00;
		for(var v=0;v<redata.length-1;v++){
		allsum=0.00;
		var allobj=redata[v];
		for(obj in allobj){
		if(obj==zhi){
		var ans= allobj[obj];
		if(typeof(ans)=="undefined"||ans==""){
		ans=0.00;
		}
		allsum=parseFloat(allsum)+parseFloat(allobj[obj]);
		}
		}
		}
		
		var json_filed4="{$set:{'"+zjmc+"':'"+allsum+"'}}";
		console.log("{'_id':'"+lid+"'}");
		console.log(json_filed4);
		//进行更新
		table_update_new_tb(all_table_name,"{'_id':'"+lid+"'}",json_filed4,function(){
			
		});
		
	});
	
	}else{
	table_search_new_tb(mb_tname,json2,json_filed2,0,0,"",function(data){
		var redata=eval("("+data+")");
		for(var y=0;y<redata.length-1;y++){
		var alldata=redata[y];
		alldata.partentid=_id;
		alldata.compid=compid;
		alldata.userid=userid;
		alldata.username=username;
		delete alldata._id;
		alldata=JSON.stringify(alldata);
		var reg = new RegExp( '"' , "g" )
		var alldata = alldata.replace( reg , '\'' );
		var json_filed=alldata;
		json_filed="{$set:"+json_filed+"}";
		table_update_new_tb(all_table_name,"{'_id':'"+lid+"'}",json_filed,function(){
			
		});
		
		}
		});
	
	}
	
	
	})
	}
	}
	}
	});
})

}






}else if(typeof(gongshi)!="undefined"&&gongshi!=""){
//待处理
console.log("待处理");
console.log(zjmc);
//如果是公式
var gongshi=redata[i].公式;
console.log(gongshi);
if(typeof(gongshi)!="undefined"&&gongshi!=""){
//解析公式 
var array_gs=gongshi.split(",");
var allstr="";
for(var n=0;n<array_gs.length;n++){
var str=array_gs[n];

if(str!="+"&&str!="-"&&str!="*"&&str!="%"){
if(n==0){
allstr="'"+str+"':1";

}else{

allstr=allstr+",'"+str+"':1";
}

}

}
allstr="{"+allstr+"}";
console.log(allstr);
table_search_new_tb(all_table_name,"",allstr,0,0,"",function(data){
var redata=eval("("+data+")");
console.log(redata);
for(var q=0;q<redata.length-1;q++ ){
var lid=redata[q]._id;
var allobj=redata[q];
for(obj in allobj){
var allresu=0.00;
var resu=allobj[array_gs[0]];
var resu1=allobj[array_gs[2]];
if(typeof(resu)=="undefined"||resu==""){
resu=0.00;
}
if(typeof(resu1)=="undefined"||resu1==""){
resu1=0.00;
}
var ys=array_gs[1];
console.log(resu);
console.log(resu1);
console.log(ys);
if(ys=="+"){
allresu=parseFloat(resu)+parseFloat(resu1);
}else if(ys=="-"){
allresu=parseFloat(resu)-parseFloat(resu1);
}
console.log(all_table_name);
console.log("{'_id':"+lid+"}");
console.log("{$set:{'"+zjmc+"':'"+allresu+"'}}");
table_update_new_tb(all_table_name,"{'_id':'"+lid+"'}","{$set:{'"+zjmc+"':'"+allresu+"'}}",function(){

	
});
}

}





});

}

}else{
//初始化表
initTable();

}

if(i==redata.length-1){
//初始化表
initTable();
}
}

})

}
	
});
	
}



//取连续数字
function getNum(str,isFilter){
		//用来判断是否把连续的0去掉
		isFilter = isFilter || false;
		if (typeof str === "string") {
	            // var arr = Str.match(/(0\d{2,})|([1-9]\d+)/g);
	            //"/[1-9]\d{1,}/g",表示匹配1到9,一位数以上的数字(不包括一位数).
	            //"/\d{2,}/g",  表示匹配至少二个数字至多无穷位数字
	            var arr = str.match( isFilter ? /[1-9]\d{1,}/g : /\d{2,}/g);
	            return arr.map(function (item) {
	                //转换为整数，
	                //但是提取出来的数字，如果是连续的多个0会被改为一个0，如000---->0，
	                //或者0开头的连续非零数字，比如015，会被改为15，这是一个坑
	                // return parseInt(item);
	                //字符串，连续的多个0也会存在，不会被去掉
	                return item;
	            });
	        } else {
	            return [];
	         }
}


//自定义数据表头
function initTable_children(zdysjb,zdysjid,divid) {
	//pid
     var tname=zdysjb;
	table_search_new("lykj_table", "{$and:[{'partentid':'" + zdysjid + "'},{'是否查询时显示':true}]}", "", 0, 0, "{'_id':1}", function(data) {
		var redata1 = eval("(" + data + ")");
		var myColumns = new Array();
		for (var i = 0; i < redata1.length - 1; i++) {
		myColumns.push({"field" : redata1[i].名称,
			"title" : redata1[i].名称,
		});
		}
		
		myColumns.push({'title' : '操作',
			'field' : '#',
			'align' : 'center',
			'formatter' : function(value, row, index) {
				var all = "";
				d = "<a class='mui-btn mui-btn-red' href='javascript:;' onclick=btn_delete_new('" + row._id + "')>删除</a>";
				return all;
			}
		});
		
		
         
		//先销毁表格  
		$("#table_"+guid).bootstrapTable('destroy');
		//初始化表格,动态从服务器加载数据  
		$("#table_"+guid).bootstrapTable({method : "get", //使用get请求到服务器获取数据  
			url : surl + "userAction_table_search_new_table.action", //获取数据的Servlet地址  
			striped : true, //表格显示条纹  
			pagination : true, //启动分页  
			cardView : false, //用户移动设备
			pageSize : 10, //每页显示的记录数  
			currentPage : 1, //当前第几页  
			pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
			search : false, //是否启用查询
			searchOnEnterKey : false, //回车查询
			showColumns : false, //显示下拉框勾选要显示的列  
			showRefresh : false, //显示刷新按钮  
			sidePagination : "server", //表示服务端请求 ,  
			silent : true,
			editable:true,//开启编辑模式
        	cache: false,
        	showToggle:true, //显示切换按钮来切换表/卡片视图。
			//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
			//设置为limit可以获取limit, offset, search, sort, order  
			queryParamsType : "undefined",
			queryParams : function queryParams(params) {
				//设置查询参数  
				str = params.searchText;
				var str_search = "";
				var search_show="";		
				var param = {
					currentPage : params.pageNumber,
					pageSize : params.pageSize,
					table_name : tname,
					str_search : str_search,
					str_sort : "{'time':-1}"
				};
				return param;
			},
			onLoadSuccess : function() { //加载成功时执行  
				console.log("加载成功");
			},
			onLoadError : function() { //加载失败时执行  
				console.log("加载数据失败", {time : 1500,
					icon : 2
				});
			},
			showExport : false, //是否显示导出按钮  
			exportDataType : "all", //basic', 'all', 'selected'.
			columns : myColumns
		});
	})
}


function btn_children_submit(zdysjb,zdysjid,divid){
	var redata=eval("("+JSON.stringify($("#table_"+guid).bootstrapTable('getData'))+")");
	console.log(redata);
	for(var i=0;i<redata.length;i++){
	var c1=redata[i].类别;
	var c2=redata[i].开始时间;
	var c3=redata[i].结束时间;
	var c4=redata[i].工作内容;
	var c5=redata[i].沟通对象;
	if(c4==""){

	}else{
	if(c1=="0"){
		mui.toast("请选择事项"+i+"工作分类");
		return;
	}
	
	if(c2==""){
		mui.toast("请选择事项"+i+"开始时间");
		return;
	}
	
	if(c3==""){
		mui.toast("请选择事项"+i+"结束时间");
		return;
	}
	
	if(c4==""){
		mui.toast("请输入事项"+i+"工作内容");
		return;	
	}
	
	var year=new Date().format("yyyy");
	var nowdate=new Date().format("yyyy-MM-dd");
	
	
	
	var json="'类别':'"+c1+"'";
	json=json+",'工作用时':'40'";
	json=json+",'开始时间':'"+c2+"'";
	json=json+",'结束时间':'"+c3+"'";
	json=json+",'频率':'1'";
	json=json+",'工作内容':'"+c4+"'";
	json=json+",'userid':'"+userid+"'";
	json=json+",'partentid':'"+partentid+"'";
	json=json+",'年度':'"+year+"'";
	json=json+",'沟通对象':'"+c5+"'";
	json=json+",'日期':'"+clickdate+"'";
	
	
	json="{$set:{"+json+"}}";
	
	var json_filed="{'_id':''}";
	
	table_update_new("slls_gzl",json_filed,json,function(){

	});	
		
	}
	}
	initTable();


}




