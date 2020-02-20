<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<base href="<%=basePath%>">
		<title>企业搜索引擎</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="app/css/mui.css">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="app/js/bootstrap-table.min.css">
		<link rel="stylesheet" href="css/bootstrap-select.css">
		<link rel="stylesheet" href="bower_components/toast/toast.css">
		<link rel="stylesheet" href="desig/js/editor/themes/qq/qq.css">
		<link rel="stylesheet" href="node/css/bootstrapStyle/bootstrapStyle.css" media="all">
		<link rel="stylesheet" href="app/js/bootstrap-datetimepicker.css">

		<script src="app/js/mui.js"></script>
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="app/js/bootstrap.datetimepicker.js"></script>
		<script src="app/js/bootstrap.datetimepicker.zh-CN.js"></script>
		<script src="app/js/bootstrap-table.min.js"></script>
		<script src="app/js/bootstrap-table-export.js"></script>
		<script src="app/js/tableExport.js"></script>
		<script src="app/js/bootstrap-table-zh-CN.min.js"></script>
		<script src="app/js/bootstrap-select.js"></script>
		<script src="js/i18n/defaults-zh_CN.js"></script>
		<script src="node/js/h5_stimh.js"></script>
		<script src="js/jquery-html5Validate-min.js"></script>
		<script src="js/jquery.form.js"></script>
		<script src="js/jquery.qrcode.js"></script>
		<script src="js/jquery.jqprint-0.3.js"></script>
		<script src="js/jquery.jqzoom-core.js"></script>
		<script src="bower_components/toast/toast.js"></script>
		<script type="text/javascript" charset="utf-8" src="ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8" src="ueditor/ueditor.all.js">
		</script>
		<script type="text/javascript" charset="utf-8" src="ueditor/lang/zh-cn/zh-cn.js"></script>
		<script src="node/js/jquery.ztree.core.js"></script>
		<script src="node/js/jquery.ztree.excheck.js"></script>
		<script src="node/js/jquery.ztree.exedit.js"></script>
		<script src="node/js/dispicker.js"></script>
		<script src="node/web/views/admin/table_show.js?ver=8"></script>
		<style>
			.form-control {
				height: 34px !important;
			}
		</style>

		<script type="text/javascript">
			var userid = "<%=session.getAttribute("userid")%>";
			var username = "<%=session.getAttribute("name")%>";
			var roleid="<%=session.getAttribute("roleid")%>";
			var user='<%=session.getAttribute("user")%>';
			user=eval("("+user+")");
			var deptid=user[0].deptid;
			var compid=user[0].compid;
			var user_type=user[0].type;
			var udept=user[0].dept;
			mui.init();
		</script>
	</head>

	<body>
		<div id="right" style="height:100%;">
			<header class="mui-bar mui-bar-nav">
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
				<h1 class="mui-title" id="title"></h1>
			</header>

			<div class="mui-content" style="padding-left:5px;padding-right:5px">
				<div class="content">
					<div class="table-responsive">
						<div id="toolbar">
							<a href="javascript:void(0);" id="btn_mb_down" class="mui-btn mui-btn-blue right" onclick="btn_mb_down_div()">模板下载</a>
							<a href="javascript:void(0);" id="btn_txt_import" class="mui-btn mui-btn-blue right" onclick="btn_txt_import_div()">txt导入</a>
							<a href="javascript:void(0);" id="btn_import" class="mui-btn mui-btn-blue right" onclick="btn_import_div()">导入</a>
							<a href="javascript:void(0);" id="btn_add" class="mui-btn mui-btn-blue right"    onclick="btn_update('0')">新增</a>
							<a href="javascript:void(0);" id="btn_jingque" class="mui-btn mui-btn-blue right"    onclick="btn_more()">精确查找</a>
							<a href="javascript:void(0);" id="btn_delete_all" class="mui-btn mui-btn-blue right"    onclick="btn_delete_all()">删除</a>
							<a href="javascript:void(0);" id="btn_delete_all" class="mui-btn mui-btn-blue right" style="display:none"   onclick="btn_pipei_all()">重新匹配数据</a>
						</div>
						<table id="table" class="table-striped table-hover" data-mobile-responsive="true"></table>
					</div>
				</div>
			</div>

			<!--添加 修改-->
			<div class="modal fade" role="dialog" id="modal_table_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<form id="myform" method="post">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title"></h4>
							</div>
							<div class="modal-body">
								<div class="row" id="modal_form_row" style="margin-left:5px;margin-right:5px">
								</div>
							</div>

							<div class="modal-footer">
								<button type="button" class="mui-btn mui-btn-red" data-dismiss="modal">关闭</button>
								<input type='submit' class="mui-btn mui-btn-blue" id='btn_submit' value='提交' />
							</div>

						</div>
					</form>
				</div>
			</div>

			<!--删除-->
			<div class="modal fade" id="modal_delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">删除确认</h4>
						</div>
						<div class="modal-body">
							是否确定删除
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-danger" onclick="btn_delete_quren()">确认</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		

 
 
  <!-- 上传 -->
  <div class="modal fade" id="div_modal_mb_upload" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">导入</h4>
						</div>
						<div class="modal-body">
      <div class="col s12">
      <div class="file-field">
      <div class="btn blue">
        <span>选择文件</span>
        <input type="file" id="mb_upload_file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" id="fhtext" readonly="readonly" type="text">
      </div>
      </div>
      </div> 
						</div>
						<div class="modal-footer">
						    <a class="btn blue" onclick="btn_start_import()">开始导入</a>
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
	</div>
 
 
 
  <!-- 模版 -->
  <div class="modal fade" id="div_modal_mb" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">下载</h4>
						</div>
						<div class="modal-body">
						<div class="row">
                       <a class="btn blue" id="btn_excel_url" href="file/1.xls">下载模版</a>
                        </div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
	</div>
	
	
 
 		<div class="modal fade" id="modal_search" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">精确查找</h4>
						</div>
						<div class="modal-body">
							 <div class="row" id="dt_search"> </div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-danger" onclick="btn_search_jq()">搜索</button>
						</div>
					</div>
				</div>
			</div>
 
 
   <!-- 上传 -->
   <div class="modal fade" id="div_modal_txt_upload" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">导入</h4>
						</div>
						<div class="modal-body">
      <div class="col s12">
      <div class="file-field">
      <div class="btn blue">
        <span>选择文件</span>
        <input type="file" id="txt_upload_file">
      </div>
      </div>
      </div> 
						</div>
						<div class="modal-footer">
						    <a class="btn blue" onclick="btn_start_import_txt()">开始导入</a>
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
	</div>

	</body>

</html>
