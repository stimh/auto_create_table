var pic = "";
var _id = "";
var partentid = "";
var id = "";
var updateid = "";
$(document).ready(
	function() {
		_id = getQueryString("id");
		btn_search_source();
		initTable();
		btn_load_table();
		btn_load_bd_ziduan();
		//加载标题 仅用于字段有名称的
		table_return_id("lykj_table", "{}", "_id", _id, function(data) {
		var redata = eval("(" + data + ")");
		var title = redata[0].名称;
		$("title").html(title+"-字段管理");
		$("#title").html(title+"-字段管理");
		});
	}
);

mui.init();

//添加维度
function btn_update_add(id) {
	updateid = id;
	$("#num_show").hide();
	$("#select_show").hide();
	$("#date_show").hide();
	$("#select_tbody").empty();
	$("#min_date").val("");
	$("#max_date").val("");
	$("#min_num").val("");
	$("#max_num").val("");
	$("#sj_zhi").val("");
	$("#gongshi").val("");
	$("#tree_show").hide();
	$("#table_children").empty();
	$("#children_show").hide();
	$("#edata_show").hide();
	$("#gongshi_show").hide();
	//如果新增
	if(updateid == "0") {
		$("#c1").val("");
		$("#c2").val("");
		$("#c3").val("");
		$("#modal_update").modal('show');
	} else {
		//如果修改
		table_return_id("lykj_table", "", "_id", updateid, function(data) {
			var redata = eval("(" + data + ")");
			var c1 = redata[0].名称;
			$("#c1").val(c1);
			var c2 = redata[0].提示信息;
			$("#c2").val(c2);
			var c3 = redata[0].是否查询时显示;
			$("#c3").val(c3+"");
			var c4 = redata[0].是否作为查询条件;
			$("#c4").val(c4+"");
			var c5 = redata[0].是否必填;
			$("#c5").val(c5+"");
			var c6 = redata[0].是否启用;
			$("#c6").val(c6+"");
			var c7 = redata[0].类型;
			$("#c7").val(c7);
			var c8 = redata[0].是否显示;
			$("#c8").val(c8+"");
			
			var c12 = redata[0].是否已存在;
			$("#c12").val(c12+"");
			
			var min_num = redata[0].数字最小值;
			$("#min_num").val(min_num);
			var max_num = redata[0].数字最大值;
			$("#max_num").val(max_num);
			var min_date = redata[0].日期最小值;
			$("#min_date").val(min_date);
			var max_date = redata[0].日期最大值;
			$("#max_date").val(max_date);
			var select_list = redata[0].select_list;
			var select_val = redata[0].select_val;
			var tree_name = redata[0].tree_name;
			var tree_fw = redata[0].tree_fw;
			var zidingyi_id= redata[0].自定义数据表;//自定义数据源
			var zidingyi_shuju= redata[0].自定义数据源;//自定义数据源
			var zidingyi_shuju_num=redata[0].自定义数据条数;     //自定义数据条数
			var edata=redata[0].外部数据; 
			var gongshi=redata[0].公式; 
			$("#gongshi").val(gongshi);
			if(typeof(edata)!="undefined"){					
			ly_table=edata.来源表ID;
			console.log(ly_table);
			ly_table_name=edata.来源表;
			ly_table_zidun=edata.来源表字段ID;
			ly_table_ziduan_name=edata.来源表字段;
			tijian=edata.条件;
			tijian_zhi=edata.条件值;
			mb_table=edata.目标表ID;
			mb_table_name=edata.目标表;
			mb_table_zidun=edata.目标表字段ID;
			mb_table_ziduan_name=edata.目标表字段;
			s_mubiao_zhi=edata.值ID;
			s_mubiao_zhi_name=edata.值;
			
			$("#tijian_zhi").val(tijian_zhi);
			$("#s_mubiao_table1").val(ly_table);
			$("#s_mubiao_ziduan1").append("<option selected=selected value='"+ly_table_zidun+"'>"+ly_table_ziduan_name+"</option>");
			$("#sj_tiaojian").val(tijian);
			$("#s_mubiao_table").val(mb_table);
			$("#s_mubiao_ziduan").append("<option selected=selected value='"+mb_table_zidun+"'>"+mb_table_ziduan_name+"</option>");
			$("#s_mubiao_zhi").append("<option selected=selected value='"+s_mubiao_zhi+"'>"+s_mubiao_zhi_name+"</option>");
			}
			
			str = redata[0].类型;
			if(str == "number") {
				$("#num_show").show();
				$("#select_show").hide();
				$("#date_show").hide();
				$("#select_tbody").empty();
				$("#min_date").val("");
				$("#max_date").val("");
				$("#min_num").val(min_num);
				$("#max_num").val(max_num);
				$("#children_show").hide();
			} else if(str == "datetime") {
				$("#num_show").hide();
				$("#select_show").show();
				$("#date_show").hide();
				$("#select_tbody").empty();
				$("#min_date").val(min_date);
				$("#max_date").val(max_date);
				$("#min_num").val("");
				$("#max_num").val("");
				$("#children_show").hide();
			} else if(str == "select_multiple" || str == "select") {
				$("#num_show").hide();
				$("#select_show").show();
				$("#date_show").hide();
				$("#select_tbody").empty();
				$("#min_date").val("");
				$("#max_date").val("");
				$("#min_num").val("");
				$("#max_num").val("");
				$("#children_show").hide();
				if(typeof(select_val)!="undefined"){
				for(var i = 0; i < select_list.length; i++) {
				var guid = newGuid();
				$("#select_tbody").append("<tr id='" + guid + "'><td><input type='text' name='select_name' value='" + select_list[i] + "' /></td><td><input type='text' name='select_val' value='" + select_val[i] + "' /></td><td><button onclick=btn_delect_select('" + guid + "') class='mui-btn mui-btn-red'>删除</button></td></tr>");
			    }
				
				}else{
				for(var i = 0; i < select_list.length; i++) {
				var guid = newGuid();
				$("#select_tbody").append("<tr id='" + guid + "'><td><input type='text' name='select_name' value='" + select_list[i] + "' /></td><td><input type='text' name='select_val' value='" + select_list[i] + "' /></td><td><button onclick=btn_delect_select('" + guid + "') class='mui-btn mui-btn-red'>删除</button></td></tr>");
			    }
				}
				

			}else if(str == "treelist-radio"||str == "treelist-checkbox"){
			
			}
			else if(str=="children"){
			btn_bangding_children_id(zidingyi_id,zidingyi_shuju);
				$("#num_show").hide();
				$("#select_show").hide();
				$("#date_show").hide();
				$("#select_tbody").empty();
				$("#min_date").val("");
				$("#max_date").val("");
				$("#min_num").val("");
				$("#max_num").val("");
				$("#children_show").show();
				$("#edata_show").hide();
				$("#gongshi_show").hide();
			}else if(str=="edata"){
			$("#num_show").hide();
			$("#select_show").hide();
			$("#date_show").hide();
			$("#select_tbody").empty();
			$("#min_date").val("");
			$("#max_date").val("");
			$("#min_num").val("");
			$("#max_num").val("");
			$("#children_show").hide();
			$("#edata_show").show();
			$("#gongshi_show").hide();
			}else if(str=="gongshi"){
			$("#num_show").hide();
			$("#select_show").hide();
			$("#date_show").hide();
			$("#select_tbody").empty();
			$("#min_date").val("");
			$("#max_date").val("");
			$("#min_num").val("");
			$("#max_num").val("");
			$("#children_show").hide();
			$("#edata_show").hide();
			$("#gongshi_show").show();
			}else {
				$("#num_show").hide();
				$("#select_show").hide();
				$("#date_show").hide();
				$("#select_tbody").empty();
				$("#min_date").val("");
				$("#max_date").val("");
				$("#min_num").val("");
				$("#max_num").val("");
				$("#children_show").hide();
				$("#gongshi_show").hide();
			}
			
			$('.selectpicker').selectpicker('refresh');
			$('.selectpicker').selectpicker('render');
			$("#modal_update").modal('show');
		});
	}
}

//提交
function btn_submit() {
	var c1 = $("#c1").val(); //名称
	var c2 = $("#c2").val(); //提示信息
	var c3 = $("#c3").val(); //是查询时显示
	var c4 = $("#c4").val(); //是否作为查询条件
	var c5 = $("#c5").val(); //是否必填
	var c6 = $("#c6").val(); //是否启用
	var c7 = $("#c7").val(); //类型
	var c8 = $("#min_num").val(); //
	var c9 = $("#max_num").val(); //
	var c10 = $("#min_date").val(); //
	var c11 = $("#max_date").val(); //
	var c12 = $("#c8").val(); //是否显示
	var c13 = $("#c12").val(); //是否检测已存在数据
	
	var tree_tname=$("#tree_tname").val(); //树形菜单数据源
	var tree_fw=$("#tree_fw").val();       //树形菜单查看范围
	
	var zidingyi_id= $("#s_table_children").find("option:selected").attr("id");//自定义数据源
	var zidingyi_shuju= $("#s_table_children").val();//自定义数据源
	var zidingyi_shuju_num=$("#children_num").val();     //自定义数据条数
	
	var select_list = new Array();
	var select_val = new Array();
	$("input[name='select_name']").each(
		function() {
			select_list.push("'" + $(this).val() + "'");
		}
	);
	$("input[name='select_val']").each(
			function() {
				select_val.push("'" + $(this).val() + "'");
			}
		);

	if(c1 == "") {
		btn_toast("名称不能为空", 'warning', 'top-center', 3);
		return;
	}

	if(c7 == "请选择") {
		btn_toast("请选择类型", 'warning', 'top', 3);
		return;
	}
	
	//外部数据
	var edata=new Object();
	var ly_table=$("#s_mubiao_table1").val();
	var ly_table_name=$("#s_mubiao_table1").find("option:selected").text();
	var ly_table_zidun=$("#s_mubiao_ziduan1").val();
	var ly_table_ziduan_name=$("#s_mubiao_ziduan1").find("option:selected").text();
	var tijian=$("#sj_tiaojian").val();
	var mb_table=$("#s_mubiao_table").val();
	var mb_table_name=$("#s_mubiao_table").find("option:selected").text();
	var mb_table_zidun=$("#s_mubiao_ziduan").val();
	var mb_table_ziduan_name=$("#s_mubiao_ziduan").find("option:selected").text();
	var s_mubiao_zhi=$("#s_mubiao_zhi").val();
	var s_mubiao_zhi_name=$("#s_mubiao_zhi").find("option:selected").text();
	var sj_zhi=$("#sj_zhi").val();
	edata.来源表ID=ly_table;
	edata.来源表=ly_table_name;
	edata.来源表字段ID=ly_table_zidun;
	edata.来源表字段=ly_table_ziduan_name;
	edata.条件=tijian;
	edata.条件值=sj_zhi;
	edata.目标表ID=mb_table;
	edata.目标表=mb_table_name;
	edata.目标表字段ID=mb_table_zidun;
	edata.目标表字段=mb_table_ziduan_name;
	edata.值ID=s_mubiao_zhi;
	edata.值=s_mubiao_zhi_name;
	
	edata=JSON.stringify(edata);
	
	var gongshi=$("#gongshi").val();
	

	var json = "{'_id':'" + updateid + "'}";
	var json_filed = "'名称':'" + c1 + "'";
	json_filed = json_filed + ",'提示信息':'" + c2 + "'";
	json_filed = json_filed + ",'是否查询时显示':"+ c3;
	json_filed = json_filed + ",'是否作为查询条件':"+ c4;
	json_filed = json_filed + ",'是否必填':"+c5;
	json_filed = json_filed + ",'是否启用':"+c6;
	json_filed = json_filed + ",'类型':'"+c7+"'";
	json_filed = json_filed + ",'是否显示':"+c12;
	json_filed = json_filed + ",'是否已存在':"+c13;
	json_filed = json_filed + ",'数字最小值':'" + c8+"'";
	json_filed = json_filed + ",'数字最大值':'" + c9+"'";
	json_filed = json_filed + ",'日期最小值':'" + c10 + "'";
	json_filed = json_filed + ",'日期最大值':'" + c11 + "'";
	json_filed = json_filed + ",'select_list':[" + select_list + "]";
	json_filed = json_filed + ",'select_val':[" + select_val + "]";
	json_filed = json_filed + ",'tree_name':'"+tree_tname+"'";
	json_filed = json_filed + ",'tree_fw':'"+tree_tname+"'";
	json_filed = json_filed + ",'partentid':'" + _id + "'";
	json_filed = json_filed + ",'自定义数据表':'" +zidingyi_shuju  + "'";
	json_filed = json_filed + ",'自定义数据源':'" + zidingyi_id+ "'";
	json_filed = json_filed + ",'自定义数据条数':'" +zidingyi_shuju_num+ "'";
	json_filed = json_filed + ",'公式':'" +gongshi+"'";
	json_filed = json_filed + ",'外部数据':" +edata;
	

	json_filed = "{$set:{" + json_filed + "}}";
	console.log(json_filed);
	table_update_new("lykj_table", json, json_filed, function(data) {
		if(data != "") {
			btn_toast('提交成功', 'success', 'top', 3);
			$("#table").bootstrapTable('refresh');
			$("#modal_update").modal('hide');
			btn_load_bd_ziduan();
		} else {
			btn_toast('提交异常', 'error', 'top', 3);
		}
	})
}

var deleteid = "";

function btn_delete(id) {
	deleteid = id;
	$('#modal_delete').modal({
		backdrop: 'static'
	});
}

function btn_delete_quren() {
	var json = "{'_id':'" + deleteid + "'}";
	table_delete_new("lykj_table", json, function(data) {
		$("#modal_delete").modal('hide');
		$("#table").bootstrapTable('refresh');
	});
}

function initTable() {
	//先销毁表格  
	$('#table').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#table").bootstrapTable({
		method: "get", //使用get请求到服务器获取数据  
		url: surl+"userAction_table_search_new_table.action", //获取数据的Servlet地址  
		striped: true, //表格显示条纹  
		pagination: true, //启动分页  
		/* cardView:true, //用户移动设备 */
		pageSize: 10, //每页显示的记录数  
		currentPage: 1, //当前第几页  
		pageList: [5, 10, 15, 20, 25], //记录数可选列表  
		search: true, //是否启用查询
		searchOnEnterKey: true, //回车查询
		showColumns: true, //显示下拉框勾选要显示的列  
		showRefresh: true, //显示刷新按钮  
		sidePagination: "server", //表示服务端请求 ,   
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType: "undefined",
		queryParams: function queryParams(params) { //设置查询参数  
			var str_search = "{'partentid':'" + _id + "'}";
			if(typeof(params.searchText) != "undefined") {
				str_search = "{$or:[{'名称':{$regex:'" + params.searchText + "',$option:'i'}},{'描述':{$regex:'" + params.searchText + "',$option:'i'}}]}";
			}
			
			var param = {
				currentPage: params.pageNumber,
				pageSize: params.pageSize,
				table_name: "lykj_table",
				str_search: str_search,
				sort: "{'weight':1}"
			};
			return param;
		},
		onLoadSuccess: function() { //加载成功时执行  
			console.log("加载成功");
		},
		onLoadError: function() { //加载失败时执行  
			console.log("加载数据失败", {
				time: 1500,
				icon: 2
			});
		},
		toolbar: '#toolbar', //工具按钮用哪个容器
		showExport: true, //是否显示导出按钮  
		exportDataType: "all", //basic', 'all', 'selected'.
		exportTypes: ['excel'], //导出文件类型  
		exportOptions: {
			fileName: '导出', //文件名称设置  
			worksheetName: 'sheet1', //表格工作区名称  
			tableName: '导出',
			ignoreColumn: [4], //忽略某一列的索引 
		},
		columns: [{
			field: '名称',
			title: '名称'
		}, {
			field: '提示信息',
			title: '提示信息'
		}, {
			field: '是否查询时显示',
			title: '是否查询时显示'
		}, {
			field: '是否作为查询条件',
			title: '是否作为查询条件'
		}, {
			field: '是否必填',
			title: '是否必填'
		}, {
			field: '是否启用',
			title: '是否启用'
		}, {
			field: '类型',
			title: '类型'
		}, {
			field: '是否显示',
			title: '是否显示'
		}, {
			title: '操作',
			field: '#',
			align: 'center',
			formatter: function(value, row, index) {
				var d = "<a href='javascript:;' class='mui-btn mui-btn-red' onclick=btn_delete('" + row._id + "')>删除</a>"
				var e = "<a href='javascript:;' class='mui-btn mui-btn-blue' onclick=btn_update_add('" + row._id + "')>修改</a>"
				return d + e;
			}
		}]
	});
}

//添加下拉属性
function btn_add_select() {
	var guid = newGuid();
	$("#select_tbody").append("<tr id='" + guid + "'><td><input type='text' name='select_name' /></td><td><input type='text' name='select_val' /></td><td><button onclick=btn_delect_select('" + guid + "') class='mui-btn mui-btn-red'>删除</button></td></tr>");

}

//删除添加属性值
function btn_delect_select(id) {
	$("#" + id).remove();
}

function btn_change(id) {
	var str = $("#" + id).val();
	if(str == "number") {
		$("#num_show").show();
		$("#select_show").hide();
		$("#date_show").hide();
		$("#select_tbody").empty();
		$("#min_date").val("");
		$("#max_date").val("");
		$("#min_num").val("");
		$("#max_num").val("");
		$("#tree_show").hide();
		$("#children_show").hide();
		$("#edata_show").hide();
		$("#gongshi_show").hide();
	} else if(str == "datetime") {
		$("#num_show").hide();
		$("#select_show").hide();
		$("#date_show").hide();
		$("#date_show").show();
		$("#tree_show").hide();
		$("#select_tbody").empty();
		$("#min_date").val("");
		$("#max_date").val("");
		$("#min_num").val("");
		$("#max_num").val("");
		$("#children_show").hide();
		$("#edata_show").hide();
		$("#gongshi_show").hide();
	} else if(str == "select_multiple" || str == "select") {
		$("#num_show").hide();
		$("#select_show").show();
		$("#date_show").hide();
		$("#tree_show").hide();
		$("#select_tbody").empty();
		$("#min_date").val("");
		$("#max_date").val("");
		$("#min_num").val("");
		$("#max_num").val("");
		$("#children_show").hide();
		$("#edata_show").hide();
		$("#gongshi_show").hide();
	} else if(str=="treelist-radio"||str=="treelist-checkbox"){
	  $("#num_show").hide();
	  $("#select_show").hide();
	  $("#date_show").hide();
	  $("#select_tbody").empty();
	  $("#min_date").val("");
	  $("#max_date").val("");
	  $("#min_num").val("");
	  $("#max_num").val("");
	  $("#tree_show").show();
	  $("#children_show").hide();
	  $("#edata_show").hide();
	  $("#gongshi_show").hide();
	}else if(str=="children"){
		$("#num_show").hide();
		$("#select_show").hide();
		$("#date_show").hide();
		$("#date_show").hide();
		$("#tree_show").hide();
		$("#select_tbody").empty();
		$("#min_date").val("");
		$("#max_date").val("");
		$("#min_num").val("");
		$("#max_num").val("");
		$("#children_show").show();
		$("#edata_show").hide();
		$("#gongshi_show").hide();
	}else if(str=="edata"){
	$("#num_show").hide();
	$("#select_show").hide();
	$("#date_show").hide();
	$("#date_show").hide();
	$("#tree_show").hide();
	$("#select_tbody").empty();
	$("#min_date").val("");
	$("#max_date").val("");
	$("#min_num").val("");
	$("#max_num").val("");
	$("#children_show").hide();
	$("#edata_show").show();
	$("#gongshi_show").hide();
	}else if(str=="gongshi"){
	$("#num_show").hide();
	$("#select_show").hide();
	$("#date_show").hide();
	$("#date_show").hide();
	$("#tree_show").hide();
	$("#select_tbody").empty();
	$("#min_date").val("");
	$("#max_date").val("");
	$("#min_num").val("");
	$("#max_num").val("");
	$("#children_show").hide();
	$("#edata_show").hide();
	$("#gongshi_show").show();
	}
	else {
		$("#num_show").hide();
		$("#select_show").hide();
		$("#date_show").hide();
		$("#select_tbody").empty();
		$("#min_date").val("");
		$("#max_date").val("");
		$("#min_num").val("");
		$("#max_num").val("");
		$("#tree_show").hide();
		$("#children_show").hide();
		$("#edata_show").hide();
		$("#gongshi_show").hide();
	}
	}



function btn_open_modal(id){
$("#"+id).modal('show');	
}
//加载数据源
function btn_search_source(){
	var json="{'partentid':'0','userid':'"+userid+"'}";
	var json_filed="{'名称':1,'表名':1}";
	table_search_new("lykj_table",json,json_filed,0,0,"",function(data){
		var redata=eval("("+data+")");
		for(var i=0;i<redata.length-1;i++){
		$("#s_table").append("<option id='"+redata[i]._id+"' value='"+redata[i].表名+"'>"+redata[i].名称+"</option>");
		$("#s_table_children").append("<option id='"+redata[i]._id+"' value='"+redata[i].表名+"'>"+redata[i].名称+"</option>");
		}
		$('#s_table').selectpicker('refresh');
		$('#s_table').selectpicker('render');
		$('#s_table_children').selectpicker('refresh');
		$('#s_table_children').selectpicker('render');
	});
}


//更改数据源 加载字段
function btn_search_ziduan(id){
	$("#s_key").empty();
	$("#show_key").empty();
	$("#show_value").empty();
	id=$("#"+id).find("option:selected").attr("id");
	var json="{'partentid':'"+id+"'}";
	var json_filed="{'名称':1}";
	table_search_new("lykj_table",json,json_filed,0,0,"",function(data){
		var redata=eval("("+data+")");
		for(var i=0;i<redata.length-1;i++){
		$("#s_key").append("<option id='"+redata[i]._id+"' value='"+redata[i].名称+"'>"+redata[i].名称+"</option>");
		$("#show_key").append("<option id='"+redata[i]._id+"' value='"+redata[i].名称+"'>"+redata[i].名称+"</option>");
		$("#show_value").append("<option id='"+redata[i]._id+"' value='"+redata[i].名称+"'>"+redata[i].名称+"</option>");
		}
		$('#s_key').selectpicker('refresh');
		$('#s_key').selectpicker('render');
		
		$('#show_key').selectpicker('refresh');
		$('#show_key').selectpicker('render');
		
		$('#show_value').selectpicker('refresh');
		$('#show_value').selectpicker('render');
	});
}


function btn_bangding(){
	var c1=$("#s_table").val();
	var c2=$("#s_key").val();
	var c3=$("#s_value").val();
	var c4=$("#show_key").val();
	var c5=$("#show_value").val();
	if(c1==""){
	btn_toast("请选择数据源","warning","top",2000);
	return;
	}
	if(c2==""){
	btn_toast("请选择限定字段","warning","top",2000);
	return;
	}
	if(c4==""){
	btn_toast("请选择名称","warning","top",2000);
	return;
	}
	if(c5==""){
	btn_toast("请选择值","warning","top",2000);
	return;
	}
	
	$("#select_tbody").empty();

	//根据条件加载table
	var json="{'"+c2+"':'"+c3+"'}";
	if(c3==""){
	json="{'userid':'"+userid+"'}";
	}else{
	json="{'"+c2+"':'"+c3+"','userid':'"+userid+"'}";
	}
	var json_filed="{'"+c4+"':1,'"+c5+"':1}";
	table_search_new(c1,json,json_filed,0,0,"",function(data){
	var redata=eval("("+data+")");
	for(var i=0;i<redata.length-1;i++){
	var guid = newGuid();
	var objs=new Array();
	objs=redata[i];
	var s1="";
	var s2="";
	for(var obj in objs){
	if(obj==c4){
	s1=objs[obj];
	}
	if(obj==c5){
	s2=objs[obj];
	}
	}
	$("#select_tbody").append("<tr id='" + guid + "'><td><input type='text' value='"+s1+"' name='select_name' /></td><td><input value='"+s2+"' type='text' name='select_val' /></td><td><button onclick=btn_delect_select('" + guid + "') class='mui-btn mui-btn-red'>删除</button></td></tr>");
	}	
	$("#modal_source").modal('hide');
	$("#modal_update").modal();
	});
}

function btn_tree_submit(){
$("#modal_treelist").modal('hide');
}

//自定义数据 绑定
function btn_bangding_children(){
	var tname=$("#s_table_children").val();
	var c2=$("#s_table_children").find("option:selected").attr("id");
	console.log(tname);
	//初始化指标
	table_search_new("lykj_table", "{'partentid':'" + c2 + "'}", "", 0, 0, "{'_id':1}", function(data) {
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
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  onblur=btn_check_isexit('"+tname+"','"+c1+"',this) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}else{
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' onblur=btn_check_isexit('"+tname+"','"+c1+"',this.val) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "'  /></div>");
		}
		}
		} else if(c2 == "number") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "' required=true min=" + min_num + " max=" + max_num + " /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "'  min=" + min_num + " max=" + max_num + " /></div>");
		}
		} else if(c2 == "tel") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "email") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "cdcard") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "url") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "'   /></div>");
		}
		}else if(c2 == "textarea"||c2=="jsondata") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea' placeholder='" + c7 + "' required=true></textarea></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea' placeholder='" + c7 + "' ></textarea></div>");
		}
		} else if(c2 == "file") {
		var guid = newGuid();
		if(c3) {
		$("#table_children").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class=''  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "' required=true /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class=''  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "'  /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		}
		} else if(c2 == "datetime") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker' placeholder='" + c7 + "'  /></div>");
		}
		} else if(c2 == "select") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' ></select></div>");
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
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' ></select></div>");
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
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		}

		ue = UE.getEditor(guid, {zIndex : 2000,
			autoHeightEnabled : false,
			autoFloatEnabled : false
		});

		}else if(c2 == "password") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "'  /></div>");
		}
		}else if(c2=="treelist-radio"){
		console.log("进入树形");
		if(c6){
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;    position: absolute;z-index: 10000; background-color: #fefefe;padding: 5px;height: auto;margin-top: -1px;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		}
		}
		
		}else if(c2=="treelist-checkbox"){
		if(c6){
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		}
		}
		
		}
		}
		
		$("#modal_children").modal('hide')

		})	
}


//自定义数据 绑定
function btn_bangding_children_id(tname,id){
	table_search_new("lykj_table", "{'partentid':'" + id + "'}", "", 0, 0, "{'_id':1}", function(data) {
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
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  onblur=btn_check_isexit('"+tname+"','"+c1+"',this) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}else{
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "' required=true /></div>");
		}
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' onblur=btn_check_isexit('"+tname+"','"+c1+"',this.val) data-name='" + c1 + "' id='" + guid + "' data-role='form' type='text' placeholder='" + c7 + "'  /></div>");
		}
		}
		} else if(c2 == "number") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "' required=true min=" + min_num + " max=" + max_num + " /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='number' placeholder='" + c7 + "'  min=" + min_num + " max=" + max_num + " /></div>");
		}
		} else if(c2 == "tel") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='tel' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "email") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='email' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "cdcard") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='idCard|idCrad1' placeholder='" + c7 + "'   /></div>");
		}
		} else if(c2 == "url") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "' required=true  /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='url' placeholder='" + c7 + "'   /></div>");
		}
		}else if(c2 == "textarea") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea' placeholder='" + c7 + "' required=true></textarea></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label><textarea class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form'  class='materialize-textarea' placeholder='" + c7 + "' ></textarea></div>");
		}
		} else if(c2 == "file") {
		var guid = newGuid();
		if(c3) {
		$("#table_children").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class=''  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "' required=true /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12' style='margin-top:10px;margin-bottom:10px;'><div class='form-group col-xs-6 m6'><label  for='" + guid + "'>" + c1 + "</label><input class=''  type='file' id='file_" + guid + "' onchange=h5_img_upload_delete('pics_" + guid + "','pic_hide" + guid + "','',0,0,'file_" + guid + "')   placeholder='" + c7 + "'  /></div>" +
			"<div class='col-xs-6 m6 form-group'><label for='pic_hide" + guid + "' class='control-label' id='pic_label" + guid + "'>预览</label><div id='pics_" + guid + "' class='row div_pic' style='height:120px'></div><input data-role='form' data-name='" + c1 + "'  type='hidden' id='pic_hide" + guid + "' /></div></div>");
		}
		} else if(c2 == "datetime") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='date' class='datepicker' placeholder='" + c7 + "'  /></div>");
		}
		} else if(c2 == "select") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' ></select></div>");
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
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' required=true></select></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='div_" + guid + "'>" + c1 + "</label><select multiple='multiple' data-role='form' data-name='" + c1 + "' class='selectpicker show-tick form-control'  id='select_" + guid + "' ></select></div>");
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
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		} else {
		$("#table_children").append("<div class='col-xs-12 m12 input-filed'><label for='" + guid + "'>" + c1 + "</label>" +
			"<div  required=true data-role='form' type='editor' data-name='" + c1 + "'   class='' id='" + guid + "' ></div></div>");
		}

		ue = UE.getEditor(guid, {zIndex : 2000,
			autoHeightEnabled : false,
			autoFloatEnabled : false
		});

		}else if(c2 == "password") {
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "' required=true /></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control' data-name='" + c1 + "' id='" + guid + "' data-role='form' type='password' placeholder='" + c7 + "'  /></div>");
		}
		}else if(c2=="treelist-radio"){
		console.log("进入树形");
		if(c6){
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;    position: absolute;z-index: 10000; background-color: #fefefe;padding: 5px;height: auto;margin-top: -1px;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "'  data-role='form' type='hidden'  placeholder='" + c7 + "'  /><input   id='s_" + guid + "' onclick=showMenu('"+guid+"','"+tree_name+"','"+tree_fw+"') type='text' placeholder='" + c7 + "'  /><div id='div_tree_"+guid+"' class='menuContent' style='display:none;'><ul id='tree_"+guid+"' class='ztree' style='height: 200px;overflow-y: auto;'></ul></div>");
		}
		}
		
		}else if(c2=="treelist-checkbox"){
		if(c6){
		if(c3) {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		} else {
		$("#table_children").append("<div class='col-xs-6 m6 input-filed'><label for='" + guid + "'>" + c1 + "</label><input class='form-control'  data-name='" + c1 + "' id='" + guid + "' onclick=showMenu(this.id,'"+tree_name+"','"+tree_fw+"') data-role='form' type='text' placeholder='" + c7 + "'  /><ul id='tree_"+guid+"' class='ztree' style='width:180px; height: 300px;'></ul></div>");
		}
		}
		
		}
		}
		
		

		})	
}



	function btn_load_table(){
	var json="{'userid':'"+userid+"'}";
	var json_filed="";
	table_search_new("lykj_table",json,"",0,0,"{'_id':-1}",function(data){
	var redata=eval("("+data+")");	
	$("#s_mubiao_table").append("<option value='0'>请选择</option");
	$("#s_mubiao_table1").append("<option value='0'>请选择</option");
	
	for(var i=0;i<redata.length-1;i++){
	$("#s_mubiao_table").append("<option value='"+redata[i]._id+"' data-table='"+redata[i].表名+"'>"+redata[i].名称+"</option");
	$("#s_mubiao_table1").append("<option value='"+redata[i]._id+"' data-table='"+redata[i].表名+"'>"+redata[i].名称+"</option");
	}
	jQuery(".selectpicker").selectpicker('refresh');
	jQuery(".selectpicker").selectpicker('render');
	});			
	}
	
	
	function btn_load_fileds(divid,partentid){
		var json="{'partentid':'"+partentid+"'}";
		console.log(json);
		var json_filed="";
		table_search_new("lykj_table",json,json_filed,0,0,"",function(data){
			var redata=eval("("+data+")");
			$("#"+divid).empty();
			$("#s_mubiao_zhi").empty();
			for(var i=0;i<redata.length-1;i++){
			$("#"+divid).append("<option value='"+redata[i]._id+"'>"+redata[i].名称+"</option>");
			$("#s_mubiao_zhi").append("<option value='"+redata[i]._id+"'>"+redata[i].名称+"</option>");
			}
			jQuery(".selectpicker").selectpicker('refresh');
			jQuery(".selectpicker").selectpicker('render');
		});	
	}
	
	function btn_table_select_change(divid,$this){
		var cid=$($this).val();
		btn_load_fileds(divid,cid);
	}
	
	
	//查找本表字段
	function btn_load_bd_ziduan(){
	    $("#s_edata").empty();
		table_search_new("lykj_table","{'partentid':'"+_id+"'}","",0,0,"",function(data){
		var redata=eval("("+data+")");	
		for(var i=0;i<redata.length-1;i++){
		$("#s_edata").append("<option value='"+redata[i]._id+"'>"+redata[i].名称+"</option>");	
		}			
		});	
	}
