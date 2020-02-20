<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>字段管理</title>
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="stylesheet" href="../../../css/layui.css" media="all">
		<link rel="stylesheet" href="../../../css/mui.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap-select.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap-table.css" media="all">
		<link rel="stylesheet" href="../../../css/toast.css" media="all">

		<script src="../../../js/jquery.js"></script>
		<script src="../../../js/bootstrap.js"></script>
		<script src="../../../js/bootstrap-table.min.js"></script>
		<script src="../../../js/bootstrap-table-zh-CN.js"></script>
		<script src="../../../js/bootstrap-select.js"></script>
		<script src="../../../js/mui.js"></script>
		<script src="../../../js/toast.js"></script>
		<script src="../../../js/h5_stimh.js"></script>
		<script type="text/javascript" src="table_set_attr.js"></script>
		
		<script type="text/javascript">
		var userid='<%=session.getAttribute("userid")%>';
		var name='<%=session.getAttribute("name")%>';
		var user='<%=session.getAttribute("user")%>';
		user=eval("("+user+")");
		var deptid=user[0].deptid;
		var compid=user[0].compid;
		mui.init();
		</script>
		<style>
			.form-control {
				height: 34px !important;
			}
		 .form-group {
          margin-bottom:1px; 
         }
		</style>
	</head>

	<body>

		<div id="right" style="height:100%;">
			<header class="mui-bar mui-bar-nav">
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
				<h1 class="mui-title" id="title">字段管理</h1>
			</header>

			<div class="mui-content" style="padding-left:5px;padding-right:5px">
				<div class="content">
					<div class="table-responsive">
						<div id="toolbar">
							<a href="javascript:void(0);" class="layui-btn" onclick="btn_update_add('0')">新增</a>
						</div>
						<table id="table" class="table-striped table-hover" data-mobile-responsive="true"></table>
					</div>
				</div>

			</div>

			<!--添加 修改-->
			<div class="modal fade" id="modal_update" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">

					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">字段管理</h4>
						</div>

						<div class="modal-body">

							<div class="row">

								<div class="form-group col-xs-6">
									<label for="c1">名称</label>
									<input type="text" class="form-control" id="c1" placeholder="名称">
								</div>

								<div class="form-group col-xs-6">
									<label for="c2">提示信息</label>
									<input type="text" class="form-control" id="c2" placeholder="描述">
								</div>

								<div class="form-group col-xs-6">
									<label for="c3" class="control-label">是查询时显示:</label>
									<select class="selectpicker show-tick form-control" id="c3">
										<option value=true>是</option>
										<option value=false>否</option>
									</select>
								</div>

								<div class="form-group col-xs-6">
									<label for="c4" class="control-label">是否作为查询条件:</label>
									<select class="selectpicker show-tick form-control" id="c4">
									   <option value=false>否</option>
										<option value=true>是</option>
									</select>
								</div>

								<div class="form-group col-xs-6">
									<label for="c5" class="control-label">是否必填:</label>
									<select class="selectpicker show-tick form-control" id="c5">
									    <option value=false>否</option>
										<option value=true>是</option>
									</select>
								</div>

								<div class="form-group col-xs-6">
									<label for="c6" class="control-label">是否启用:(查看，修改时否可见)</label>
									<select class="selectpicker show-tick form-control" id="c6">
										<option value=true>是</option>
										<option value=false>否</option>
									</select>
								</div>
								
								
								<div class="form-group col-xs-6">
									<label for="c8" class="control-label">是否显示:提交数据时是否使用该字段</label>
									<select class="selectpicker show-tick form-control" id="c8">
										<option value=true>是</option>
										<option value=false>否</option>
									</select>
								</div>
								
								<div class="form-group col-xs-6">
									<label for="c12" class="control-label">是否已存在:检测</label>
									<select class="selectpicker show-tick form-control" id="c12">
									    <option value=false>否</option>
										<option value=true>是</option>
										
									</select>
								</div>

								<div class="form-group col-xs-6">
									<label class="control-label">类型</label>
									<select id="c7" class="selectpicker show-tick form-control" onchange="btn_change(this.id)">
										<option value='请选择' selected="selected">请选择</option>
										<option value='text'>文本</option>
										<option value='textarea'>文本域</option>
										<option value='number'>数字</option>	
										<option value='datetime'>日期</option>
										<option value='time'>时间</option>
										<option value='datetime-local'>日期和时间</option>
										<option value='file'>文件</option>
										<option value='select_multiple'>多选</option>
										<option value='select'>单选</option>
										<option value='tel'>手机号</option>
										<option value='cdcard'>身份证</option>
										<option value='email'>邮箱</option>
										<option value='url'>网址</option>
										<option value='editor'>编辑器</option>
										<option value='password'>密码</option>
										<option value='treelist-radio'>树形菜单</option>
										<option value='children'>自定义添加</option>
										<option value='edata'>外部数据</option>
										<option value='gongshi'>公式</option>
										<option value='dizhi'>地址</option>
										<option value='jsondata'>JSON数据</option>
									</select>
								</div>
								

								<div class="form-group col-xs-12" id="num_show" style="diaplya:none">
									<div class="form-group col-xs-6">
										<label class="control-label" for="min_num">最小值</label>
										<input class="form-control" type="number" placeholder="" id="min_num" />
									</div>

									<div class="form-group col-xs-6">
										<label for="max_num">最大值</label>
										<input class="form-control" type="number" placeholder="" id="max_num" />
									</div>
								</div>

								<div class="form-group col-xs-12" id="date_show" style="diaplya:none">
									<div class="form-group col-xs-6">
										<label for="min_date">最小值</label>
										<input class="form-control" type="number" placeholder="" id="min_date" />
									</div>

									<div class="form-group col-xs-6">
										<label for="max_date">最大值</label>
										<input class="form-control" type="number" placeholder="" id="max_date" />
									</div>
								</div>
								
								
								<div class="form-group col-xs-12" id="tree_show" style="diaplya:none">
									<div class="form-group col-xs-12">
									<label for="">选择数据源</label>
									<select id="tree_tname" class="selectpicker show-tick form-control">
										<option value='' selected="selected">请选择</option>
										<option value='lykj_privilege' selected="selected">平台权限</option>
										<option value='lykj_organ' selected="selected">组织机构</option>
									</select>
								</div>

								<div class="form-group col-xs-12">
									<label for="">查看范围</label>
									<select id="tree_fw" class="selectpicker show-tick form-control">
										<option value='all' selected="selected">全部</option>
										<option value='dept' selected="selected">根据部门</option>
									</select>
								</div>
								</div>

								<div class="form-group col-xs-12" id="select_show" style="diaplya:none">
									<button class="mui-btn mui-btn-blue" onclick="btn_add_select()">添加</button>
									<button class="mui-btn mui-btn-blue" onclick="btn_open_modal('modal_source')">绑定数据源</button>
									<div class="form-group" style="height:160px;overflow-y:auto">
										<table  class="table table-bordered">
											<thead>
												<tr>
													<th>名称</th>
													<th>值</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody id="select_tbody">

											</tbody>

										</table>

									</div>
								</div>
								
								<div class="form-group col-xs-12" id="children_show" style="diaplya:none">
									<button class="mui-btn mui-btn-blue" onclick="btn_open_modal('modal_children')">绑定数据源</button>
									<div class="form-group" style="height:160px;overflow-y:auto">
										<div  class="table table-bordered" id="table_children">
											
										</div>

									</div>
								</div>
								
								
								<div class="form-group col-xs-12" id="edata_show" style="diaplya:none">
								<div class="row">
								<div class="form-group col-xs-12">
									<label for="">来源表</label>
									<select id="s_mubiao_table1" class="selectpicker show-tick form-control" onchange="btn_table_select_change('s_mubiao_ziduan1',this)">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-12">
									<label for="">来源字段</label>
									<select id="s_mubiao_ziduan1" class="selectpicker show-tick form-control">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-6">
								<label for="sj_tiaojian">条件</label>
								<select id="sj_tiaojian" class='selectpicker show-tick form-control'>
								<option value='无'>无</option>
								<option value='包含'>包含</option>
								<option value='不包含'>不包含</option>
								<option value='等于'>等于</option>
								<option value='大于等于'>大于等于</option>
								<option value='小于等于'>小于等于</option>
								<option value='大于'>大于</option>
								<option value='小于'>小于</option>
								<option value='in'>in</option>
								</select>
								</div>
								
								<div class="form-group col-xs-6">
									<label for="">值</label>
									<input type="text" class="form-control" id="sj_zhi" />
								</div>
								
								<div class="form-group col-xs-12">
									<label for="">目标表</label>
									<select id="s_mubiao_table" class="selectpicker show-tick form-control" onchange="btn_table_select_change('s_mubiao_ziduan',this)">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-12">
									<label for="">目标字段</label>
									<select id="s_mubiao_ziduan" class="selectpicker show-tick form-control">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								
								<div class="form-group col-xs-12">
									<label for="">取值</label>
									<select id="s_mubiao_zhi" class="selectpicker show-tick form-control">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								
								
							</div>
							</div>
							
							<!-- 公式 -->
							<div class="form-group col-xs-12" id="gongshi_show" style="diaplya:none">
								<label>公式</label>
								<textarea rows="6" cols="" id="gongshi"></textarea>
							</div>

							
							

							</div>

						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="layui-btn" onclick="btn_submit()">提交</button>
						</div>

					</div>

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
							<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
							<button type="button" class="mui-btn mui-btn-blue" onclick="btn_delete_quren()">确认</button>
						</div>
					</div>
				</div>
			</div>
			
			
			<!--绑定数据源-->
			<div class="modal fade" id="modal_source" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">绑定数据源</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="form-group col-xs-12">
									<label for="">选择数据源</label>
									<select id="s_table" class="selectpicker show-tick form-control" onchange="btn_search_ziduan(this.id)">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>

								<div class="form-group col-xs-6">
								    <label for="c1">限定字段</label>
									<select id="s_key" class="selectpicker show-tick form-control" onchange="">
									<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-6">
								    <label for="c1">限定值</label>
									<input id="s_value" value="" class="form-control" type="number" placeholder=""  />
								</div>
								
								<div class="form-group col-xs-6">
								    <label for="c1">名称</label>
									<select id="show_key" class="selectpicker show-tick form-control" >
									<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-6">
								    <label for="c1">值</label>
									<select id="show_value" class="selectpicker show-tick form-control" >
									<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
							<button type="button" class="mui-btn mui-btn-blue" onclick="btn_bangding()">使用</button>
						</div>
					</div>
				</div>
			</div>
			
		    <!--绑定数据源  自定义数据-->
			<div class="modal fade" id="modal_children" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">绑定数据源</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="form-group col-xs-12">
									<label for="">选择数据源</label>
									<select id="s_table_children" class="selectpicker show-tick form-control" onchange="btn_search_ziduan(this.id)">
										<option value='请选择' selected="selected">请选择</option>
									</select>
								</div>
								
								<div class="form-group col-xs-12">
									<label for="children_num">最大添加条数</label>
									<input type="text" id="children_num" />
								</div>
								
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
							<button type="button" class="mui-btn mui-btn-blue" onclick="btn_bangding_children()">使用</button>
						</div>
					</div>
				</div>
			</div>	
			
			
			
		
			

		</div>

	</body>

</html>
