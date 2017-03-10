<template>
	<div class="cms">
		<p class="title" flex="dir:left"><span @click='close'>编辑案例</span></p>
		<div class="add_msg" flex="dir:top">
			<div class="input-box" flex="dir:left cross:center">
				<p class="word important">案例标题</p>
				<input class="getmsg" type="text" placeholder='这里输入标题，字数限制20字' maxlength="20" v-model="title">
			</div>
			<div class="input-box" flex="dir:left cross:center">
				<p class="word important">案例描述</p>
                <textarea class="getdescription" type="text" placeholder='这里输入描述，字数限制48字' maxlength="48" v-model='description'></textarea>
			</div>
			<div class="input-box" flex="dir:left cross:center">
				<p class="word important">封面图</p>
                <div class="Hq_logo">
                    <img :src="case_img+'@!gif'" alt="品牌logo" v-if="case_img!=null&&case_img!=''">
                    <input type="file" id="case_Upload" @change="getfile" accept="image/jpeg,image/gif,image/png,image/bmp,image/jpg" v-if="accessid!=null"/>
                </div>
                <div flex="dir:top main:center" class="explain">
                    <p>图片尺寸:1200*900</p>
                    <p>图片大小:不超过5M</p>
                    <p>图片格式:PNG,JPG,GIF</p>
                </div>
			</div>
			<div class="input-box" flex="dir:left cross:center">
				<p class="word important">添加模块</p>
				<div class='mode' flex="dir:left cross:center main:justify">
					<span v-for="(item,index) in title1" @click="choose_title1(item.id,item.name,index,item.haschoose)" :class="{'choose':item.haschoose}" class="title_blue">{{item.name}}+</span>
				</div>
			</div>
			<div class="module-list-box" flex="dir:top" v-for="(item,num) in msg">
				<div class='module-top' flex="dir:left cross:center main:justify">
                    <input type="text" v-model="num" flex-box='0' class="order_num" @blur="change_num_title_1_stop(num)" @focus="change_num_tart(num)"></input>
					<p flex-box='0'>{{item.name}}</p>
                    <div class="add_title2-box" flex-box='1'>
                        <div class="title2">
                            <span
                                v-for="(items,index) in title_2_by_id"
                                class="title_blue"
                                @click="choose_title2(items.id,items.name,index,num,items.haschoose)"
                                :class="{'choose':items.haschoose}"
                                v-if="item.case_module_type_1==items.prev_id"
                                >{{items.name}}+</span>
                        </div>
                    </div>
					<div flex-box='0'>
						<p class="delete" @click="delete_list_1(num,item.case_module_type_1)">删除</p>
					</div>
				</div>
				<div class="module" flex="dir:top main:center" v-for='(title2,order) in item.case_module_type_1_list'>
                    <div class="top" flex="dir:left cross:center main:justify">
                        <input type="text" v-model.num="order" flex-box='0' class="order_num" @blur="change_num_title_2_stop(num,order)" @focus="change_num_tart(order)"></input>
                        <p flex-box='0'>{{title2.name}}</p>
                        <div class="add_title3-box" flex-box='1'>
                            <div class="title3">
                                <span class="title_blue choose">不限+</span>
                                <template
                                    v-for="(items,index) in title_3_by_id"
                                    v-if="title2.case_module_type_2==items.prev_id">
                                    <span
                                        class="title_blue"
                                        @click="choose_title3(items.id,items.name,index,num,order,items.haschoose)"
                                        :class="{'choose':items.haschoose}"
                                        v-if="items.name!='不限'"
                                    >{{items.name}}+</span>
                                    <span
                                        class="title_blue_unlimited"
                                        @click="choose_title3(items.id,items.name,index,num,order,items.haschoose)"
                                        :class="{'choose_unlimited':items.haschoose}"
                                        v-else
                                    >{{items.name}}+</span>
                                </template>

                            </div>
                        </div>
                        <div flex-box='0'>
                            <p class="delete" @click="delete_list_2(num,order,item.case_module_type_1,title2.case_module_type_2)">删除</p>
                        </div>
                    </div>
                    <div class="msg" v-for="(input,idnum) in title2.case_module_type_2_list" flex="dir:top main:center" :key="input.case_module_3_id">
                        <div flex="dir:left cross:center" class="title3-top-box">
                            <input type="text" v-model="idnum" flex-box='0' class="order_num" @blur="change_num_title_3_stop(num,order,idnum)" @focus="change_num_tart(idnum)"></input>
                            <p class="title3-top" flex-box='1'>{{input.name}}</p>
                            <p class="delete" @click="delete_list_3(num,order,idnum,input.case_module_3_id)">删除</p>
                        </div>
                        <Editor
                            :input-content="input.content"
                            :input-id="'change'+input.case_module_3_id"
                            v-model="input.content">
                        </Editor>
                    </div>
				</div>
			</div>
            <div class="wedding-list-box vis" flex="dir:left" v-if="title1[4].haschoose">
                <p class="title">婚礼信息</p>
                <div class="list vis" flex-box='1'>
                    <div class="wedding-list" flex="dir:left box:mean">
                        <section flex-box='2' flex="cross:center main:center">序号</section>
                        <section flex-box='3' flex="cross:center main:center">名称</section>
                        <section flex-box='5' flex="cross:center main:center">信息详情</section>
                    </div>
                    <div class="wedding-list vis" flex="dir:left box:mean">
                        <section flex-box='2' flex="cross:center main:center">1</section>
                        <section flex-box='3' flex="cross:center main:center">婚礼日期</section>
                        <section flex-box='5' flex="cross:center main:center" class="vis">
                            <datepicker v-model="date" language='ch' flex-box="1" class="vis"></datepicker>
                        </section>
                    </div>
                    <div class="wedding-list" flex="dir:left box:mean">
                        <section flex-box='2' flex="cross:center main:center">2</section>
                        <section flex-box='3' flex="cross:center main:center">婚礼规模</section>
                        <section flex-box='5' flex="cross:center main:center">
                            <input class="size" type='number' v-model.number="wedding_size"></input>
                        </section>
                    </div>
                    <div class="wedding-list" flex="dir:left box:mean">
                        <section flex-box='2' flex="cross:center main:center">3</section>
                        <section flex-box='3' flex="cross:center main:center">婚礼场地</section>
                        <section flex-box='5' flex="cross:center main:center">
                            <span>{{wedding_seller_name}}</span>
                            <span v-if='wedding_seller_name!=null&&wedding_seller_status==2'>(已停用)</span>
                            <span v-if="wedding_area_name!=null&&wedding_seller_name!=null">+</span>
                            <span>{{wedding_area_name}}</span>
                            <span v-if='wedding_area_name!=null&&wedding_area_status==2'>(已停用)</span>
                            <span class="delete" v-if="wedding_area_name!=null||wedding_seller_name!=null" @click="delete_wedding_msg">删除</span>
                            <span @click="addseller('msg')" class="add_seller" v-if="wedding_area_name==null&&wedding_seller_name==null">关联商家+</span>
                        </section>
                    </div>
                </div>
            </div>
            <div class="wedding-list-box" flex="dir:left" v-if="title1[5].haschoose">
                <p class="title">团队/费用</p>
                <div class="list" flex-box='1'>
                    <div class="wedding-list" flex="dir:left box:mean">
                        <section flex-box='2' flex="cross:center main:center">序号</section>
                        <section flex-box='4' flex="cross:center main:center">服务团队</section>
                        <section flex-box='9' flex="cross:center main:center">关联商家</section>
                        <section flex-box='5' flex="cross:center main:center">费用</section>
                        <section flex-box='5' flex="cross:center main:center">备注</section>
                    </div>
                    <div class="wedding-list" flex="dir:left box:mean" v-for="(item,index) in fix_case_team_fee_list">
                        <section flex-box='2' flex="cross:center main:center">{{index+1}}</section>
                        <section flex-box='4' flex="cross:center main:center">{{item.name}}</section>
                        <section flex-box='9' flex="cross:center main:center">
                            <span v-if="item.seller_id" class="seller_name">{{item.seller_name}}</span>
                            <span v-if="item.seller_id&&item.seller_status==2">(已停用)</span>
                            <span v-if="item.seller_id" class="delete" @click="detele_team(index)">删除</span>
                            <span @click="addseller(index)" v-if="item.team_id!=9&&item.team_id!=10&&!item.seller_id" class="add_seller">添加商家+</span>
                        </section>
                        <section flex-box='5' flex="cross:center main:center">
                            <input class="size" type='number' v-model.number="item.cost"></input>
                        </section>
                        <section flex-box='5' flex="cross:center main:center">
                            <input class="size" v-model="item.description" maxlength="8"></input>
                        </section>
                    </div>
                </div>
            </div>
            <div class="input-box" flex="dir:left cross:center">
                <p class="word important">案例标签</p>
                <div flex-box="1" class="tag-box">
                    <p v-for="(item,index) in my_tag_ids" :style="{background:item.color}">
                        <span>{{item.name}}</span>
                        <span class="delete_tag" @click="delete_my_tag_ids(index)">x</span>
                    </p>
                    <p class="open_tag" @click="open_tag">添加标签+</p>
                </div>
            </div>
            <div flex="dir:left main:center">
                <div class="save" @click="save">保存</div>
                <div class="give-up" @click="goback">放弃编辑</div>
            </div>

		</div>
        <div class="search_seller" flex="dir:top" v-if="seller_open">
            <P class="title">搜索商家</P>
            <section flex="dir:left" class="search_list">
                <span>商家城市</span>
                <select class="YY-select" v-model='choose_city'>
                    <option v-for="item in city_list" :value="item.city_id" >{{item.name}}</option>
                </select>
            </section>
            <section flex="dir:left" class="search_list">
                <span>服务商家</span>
                <select class="YY-select" v-model='choose_category'>
                    <option v-for="item in category_list" :value="item.seller_category_id">{{item.name}}</option>
                </select>
            </section>
            <section flex="dir:left" class="search_list">
                <span>商家名称</span>
                <select class="YY-select" v-model='choose_seller'>
                    <option v-for="item in seller_list" :value="item.seller_id">{{item.name}}</option>
                </select>
            </section>
            <section flex="dir:left" class="search_list">
                <span>区域详情</span>
                <select class="YY-select" v-model='choose_area'>
                    <option value=null >无</option>
                    <option v-for="item in area_list" :value="item.area_id" >{{item.name}}</option>
                </select>
            </section>
            <div flex="dir:left main:justify" class="make_sure">
                <div class="save" @click="save_seller">保存</div>
                <div class="give-up" @click='close_seller'>取消</div>
            </div>
        </div>
        <div class="search_tag_list" flex="dir:top" v-if='tag_open'>
            <div flex="dir:left cross:center" class="title">
                <p flex-box="0">选择案例标签</p>
                <div flex-box="1" class="tag-box">
                    <p v-for="(item,index) in choose_tag_list" :style="{background:item.color}">
                        <span>{{item.name}}</span>
                        <span class="delete_tag" @click="delete_my_tag(index)">x</span>
                    </p>
                </div>
            </div>
            <section flex="dir:left" class="search_list">
                <span>选择种类</span>
                <select class="YY-select" v-model='choose_tag'>
                    <option v-for="item in tag_list" :value="item.tag_id" >{{item.name}}</option>
                </select>
            </section>
            <section flex="dir:left" class="search_list">
                <span>选择标签</span>
                <div v-for="item in tag_list" class="choose_box" v-if="choose_tag==item.tag_id">
                    <span v-for="items in item.children" class='tag' :style="{background:items.color}" @click="choose_my_tag(items)">{{items.name}}</span>
                </div>
            </section>
            <div flex="dir:left main:justify" class="make_sure">
                <div class="save" @click="save_tag">保存</div>
                <div class="give-up" @click='give_up_tag'>取消</div>
            </div>
        </div>
        <div class="show_img" :style="{top:video_show_top+'px',left:video_show_left+'px'}" v-if="video_show_open">
            <img :src="video_show_img+'@!gif'">
        </div>
	</div>
</template>
<script>
import datepicker from 'vue-date'
import CommonApi from '../../../api/Common'
import cmsApi from '../../../api/cms'
import serviceApi from '../../../api/service'
import Editor from './edit'
	export default {
		name:'cms',
		data(){
			return{
                video_show_open:false,
                video_show_top:0,
                video_show_left:0,
                video_show_img:null,
                my_tag_ids:[],
                choose_tag_list:[],
                choose_tag:null,
                tag_open:false,
                tag_list:[],
                start_num:null,
                wedding_size:null,
                wedding_seller_name:null,
                wedding_seller_status:null,
                wedding_seller_id:null,
                wedding_area_id:null,
                wedding_area_name:null,
                wedding_area_status:null,
                change_index:null,
                date: '0000-00-00',
                seller_open:false,
                city_list:null,
                category_list:null,
                seller_list:null,
                area_list:null,
                choose_city:null,
                choose_category:null,
                choose_seller:null,
                choose_area:null,
                files:null,
                host:null,
                access_url:null,
                accessid:null,
                expire:null,
                host:null,
                key:null,
                oss_bucket:null,
                policy:null,
                signature:null,
                title:null,
                case_img:null,
                description:null,
				title1:[{
                    id:1,
                    name:'婚礼细节',
                    haschoose:false
                },{
                    id:2,
                    name:'婚礼周边',
                    haschoose:false
                },{
                    id:3,
                    name:'策划师说',
                    haschoose:false
                },{
                    id:4,
                    name:'新人故事',
                    haschoose:false
                },{
                    id:5,
                    name:'婚礼信息',
                    haschoose:false
                },{
                    id:6,
                    name:'婚礼团队&费用',
                    haschoose:false
                }],
                title_2_by_id:[{
                    id:1,
                    name:'不限',
                    haschoose:false,
                    prev_id:1
                },{
                    id:2,
                    name:'序',
                    haschoose:false,
                    prev_id:1
                },{
                    id:3,
                    name:'婚礼仪式区',
                    haschoose:false,
                    prev_id:1
                },{
                    id:4,
                    name:'婚礼宴会区',
                    haschoose:false,
                    prev_id:1
                },{
                    id:5,
                    name:'婚礼迎宾区',
                    haschoose:false,
                    prev_id:1
                },{
                    id:6,
                    name:'婚礼观礼区',
                    haschoose:false,
                    prev_id:1
                },{
                    id:7,
                    name:'婚礼手绘区',
                    haschoose:false,
                    prev_id:1
                },{
                    id:8,
                    name:'婚礼花艺',
                    haschoose:false,
                    prev_id:1
                },{
                    id:9,
                    name:'after party',
                    haschoose:false,
                    prev_id:1
                },{
                    id:10,
                    name:'创意流程',
                    haschoose:false,
                    prev_id:1
                },{
                    id:11,
                    name:'不限',
                    haschoose:false,
                    prev_id:2
                },{
                    id:12,
                    name:'婚纱礼服',
                    haschoose:false,
                    prev_id:2
                },{
                    id:13,
                    name:'珠宝首饰',
                    haschoose:false,
                    prev_id:2
                },{
                    id:14,
                    name:'请柬',
                    haschoose:false,
                    prev_id:2
                },{
                    id:15,
                    name:'糖盒',
                    haschoose:false,
                    prev_id:2
                },{
                    id:16,
                    name:'婚鞋',
                    haschoose:false,
                    prev_id:2
                },{
                    id:17,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:18,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:19,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:20,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:21,
                    name:'婚礼花絮',
                    haschoose:false,
                    prev_id:1
                },{
                    id:22,
                    name:'伴手礼',
                    haschoose:false,
                    prev_id:2
                }],
                title_3_by_id:[{
                    id:1,
                    name:'不限',
                    haschoose:false,
                    prev_id:1
                },{
                    id:2,
                    name:'不限',
                    haschoose:false,
                    prev_id:2
                },{
                    id:3,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:4,
                    name:'主背景',
                    haschoose:false,
                    prev_id:3
                },{
                    id:5,
                    name:'甬道',
                    haschoose:false,
                    prev_id:3
                },{
                    id:6,
                    name:'路引',
                    haschoose:false,
                    prev_id:3
                },{
                    id:7,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:8,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:9,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:10,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:11,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:12,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:13,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:14,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:15,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:16,
                    name:'不限',
                    haschoose:false,
                    prev_id:4
                },{
                    id:17,
                    name:'摆台',
                    haschoose:false,
                    prev_id:4
                },{
                    id:18,
                    name:'桌花',
                    haschoose:false,
                    prev_id:4
                },{
                    id:19,
                    name:'椅背装饰',
                    haschoose:false,
                    prev_id:4
                },{
                    id:20,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:21,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:22,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:23,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:24,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:25,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:26,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:27,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:28,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:29,
                    name:'不限',
                    haschoose:false,
                    prev_id:5
                },{
                    id:30,
                    name:'合影区',
                    haschoose:false,
                    prev_id:5
                },{
                    id:31,
                    name:'签到台',
                    haschoose:false,
                    prev_id:5
                },{
                    id:32,
                    name:'甜品区',
                    haschoose:false,
                    prev_id:5
                },{
                    id:33,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:34,
                    name:'不限',
                    haschoose:false,
                    prev_id:7
                },{
                    id:35,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:36,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:37,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:38,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:39,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:40,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:41,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:42,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:43,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:44,
                    name:'不限',
                    haschoose:false,
                    prev_id:8
                },{
                    id:45,
                    name:'手捧花',
                    haschoose:false,
                    prev_id:8
                },{
                    id:46,
                    name:'不限',
                    haschoose:false,
                    prev_id:9
                },{
                    id:47,
                    name:'不限',
                    haschoose:false,
                    prev_id:10
                },{
                    id:48,
                    name:'不限',
                    haschoose:false,
                    prev_id:11
                },{
                    id:49,
                    name:'不限',
                    haschoose:false,
                    prev_id:12
                },{
                    id:50,
                    name:'不限',
                    haschoose:false,
                    prev_id:13
                },{
                    id:51,
                    name:'不限',
                    haschoose:false,
                    prev_id:14
                },{
                    id:52,
                    name:'不限',
                    haschoose:false,
                    prev_id:15
                },{
                    id:53,
                    name:'不限',
                    haschoose:false,
                    prev_id:16
                },{
                    id:54,
                    name:'不限',
                    haschoose:false,
                    prev_id:17
                },{
                    id:55,
                    name:'不限',
                    haschoose:false,
                    prev_id:18
                },{
                    id:56,
                    name:'不限',
                    haschoose:false,
                    prev_id:19
                },{
                    id:57,
                    name:'不限',
                    haschoose:false,
                    prev_id:20
                },{
                    id:58,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:59,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:60,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:61,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:62,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:63,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:64,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:65,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:66,
                    name:'不限',
                    haschoose:false,
                    prev_id:3
                },{
                    id:67,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:68,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:69,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:70,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:71,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:72,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:73,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:74,
                    name:'不限',
                    haschoose:false,
                    prev_id:6
                },{
                    id:75,
                    name:'椅背装饰',
                    haschoose:false,
                    prev_id:6
                },{
                    id:76,
                    name:'不限',
                    haschoose:false,
                    prev_id:21
                },{
                    id:77,
                    name:'不限',
                    haschoose:false,
                    prev_id:22
                }],
                msg:[],
	            open:false,
                fix_case_team_fee_list:[{
                    team_id:1,
                    name:'策划',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:2,
                    name:'现场搭建',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:3,
                    name:'主持',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:4,
                    name:'摄像',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:5,
                    name:'摄影',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:6,
                    name:'化妆',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:7,
                    name:'花艺',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:8,
                    name:'甜品',
                    seller_name:null,
                    seller_id:null,
                    seller_status:null,
                    cost:null,
                    description:null,
                },{
                    team_id:9,
                    name:'其他',
                    cost:null,
                    description:null,
                },{
                    team_id:10,
                    name:'共计花费',
                    cost:null,
                    description:null,
                }]
			}
		},
		methods:{
            choose_my_tag(item){
                for(let items of this.choose_tag_list){
                    if(items.tag_id==item.tag_id){
                        return
                    }
                }
                this.choose_tag_list.push(item)
            },
            delete_my_tag(index){
                this.choose_tag_list.splice(index,1)
            },
            delete_my_tag_ids(index){
                this.my_tag_ids.splice(index,1)
            },
            save_tag(){
                this.my_tag_ids=[]
                for(let msg of this.choose_tag_list){
                    this.my_tag_ids.push(msg)
                }
                this.tag_open=false
            },
            give_up_tag(){
                this.choose_tag_list=[]
                for(let msg of this.my_tag_ids){
                    this.choose_tag_list.push(msg)
                }
                this.tag_open=false
            },
            open_tag(){
                this.choose_tag_list=[]
                for(let msg of this.my_tag_ids){
                    this.choose_tag_list.push(msg)
                }
                this.tag_open=true
            },
            choose_title1(id,name,index,haschoose){
                if(haschoose){return}

                this.title1[index].haschoose = true
                if(id==5){
                    return
                }
                if(id==6){
                    return
                }
                let list = {}
                list.case_module_type_1 = id
                list.name = name
                list.case_module_type_1_list=[]
                this.msg.push(list)
            },
            choose_title2(id,name,index,num,haschoose){
                if(haschoose){return}
                this.title_2_by_id[index].haschoose = true
                let list = {}
                list.case_module_type_2 = id
                list.name = name
                list.case_module_type_2_list=[]
                this.msg[num].case_module_type_1_list.push(list)
            },
            choose_title3(id,name,index,num,order,haschoose){
                if(haschoose){return}
                this.title_3_by_id[index].haschoose = true
                let list = {}
                list.case_module_3_id = id
                list.name = name
                list.content=null
                this.msg[num].case_module_type_1_list[order].case_module_type_2_list.push(list)
            },
            change_num_tart(num){
                this.start_num=num
            },
            change_num_title_1_stop(num){
                if(this.start_num==num){return}
                let msg=this.msg[this.start_num]
                this.msg.splice(this.start_num,1)
                this.msg.splice(num,0,msg)
                this.start_num=null
            },
            change_num_title_2_stop(num,order){
                if(this.start_num==order){return}
                let msg=this.msg[num].case_module_type_1_list[this.start_num]
                this.msg[num].case_module_type_1_list.splice(this.start_num,1)
                this.msg[num].case_module_type_1_list.splice(order,0,msg)
                this.start_num=null
            },
            change_num_title_3_stop(num,order,idnum){
                if(this.start_num==idnum){return}
                let msg=this.msg[num].case_module_type_1_list[order].case_module_type_2_list[this.start_num]
                this.msg[num].case_module_type_1_list[order].case_module_type_2_list.splice(this.start_num,1)
                this.msg[num].case_module_type_1_list[order].case_module_type_2_list.splice(idnum,0,msg)
                this.start_num=null
            },
            delete_list_1(num,id){
                this.msg.splice(num,1)
                for(let item of this.title1){
                    if(item.id==id){
                        item.haschoose=false
                    }
                }
                for(let item of this.title_2_by_id){
                    if(item.prev_id==id){
                        item.haschoose=false
                        for(let item_2 of this.title_3_by_id){
                            if(item_2.prev_id==item.id){
                                item_2.haschoose=false
                            }
                        }
                    }
                }
            },
            delete_list_2(num,order,prev_id,id){
                this.msg[num].case_module_type_1_list.splice(order,1)
                for(let item of this.title_2_by_id){
                    if(item.id==id){
                        item.haschoose=false
                    }
                }
                for(let item of this.title_3_by_id){
                    if(item.prev_id==id){
                        item.haschoose=false
                    }
                }
            },
            delete_list_3(num,order,idnum,id){
                this.msg[num].case_module_type_1_list[order].case_module_type_2_list.splice(idnum,1)
                for(let item of this.title_3_by_id){
                    if(item.id==id){
                        item.haschoose=false
                    }
                }
            },
            detele_team(index){
                this.fix_case_team_fee_list[index].seller_id=null
                this.fix_case_team_fee_list[index].seller_name=null
                this.fix_case_team_fee_list[index].seller_status=null
            },
			close(){
				this.open=false
			},
            getfile(){
                this.files=document.querySelector('#case_Upload').files
                let from=new FormData()
                let now_time=new Date().getTime()
                from.append('OSSAccessKeyId',this.accessid)
                from.append('key',this.key+now_time+'_'+'${filename}')
                from.append('policy',this.policy)
                from.append('signature',this.signature)
                from.append('file',this.files[0])
                this.$http.post(this.host,from)
                .then((response) => {
                    this.case_img=this.access_url+this.key+now_time+'_'+this.files[0].name
                })
            },
            save(){
                if(this.title==null||this.title==''){
                    this.$store.dispatch('alert-msg', '请输入标题')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.description==null||this.description==''){
                    this.$store.dispatch('alert-msg', '请输入描述')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.case_img==null){
                    this.$store.dispatch('alert-msg', '请上传封面图')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.msg.length==0){
                    this.$store.dispatch('alert-msg', '请添加模块')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.my_tag_ids.length==0){
                    this.$store.dispatch('alert-msg', '请添加标签')
                    this.$store.dispatch('alert-start')
                    return
                }
                if(this.$route.query.article_id){
                    cmsApi.UpdateCase(this)
                    return
                }
                cmsApi.AddCase(this)
            },
            goback(){
                localStorage.removeItem('case_add_title_1')
                localStorage.removeItem('case_add_title_2')
                localStorage.removeItem('case_add_title_3')
                localStorage.removeItem('case_add_msg')
                this.$router.go(-1)
            },
            close_seller(){
                this.seller_open=false
                this.choose_city=null
                this.area_list=null
                this.choose_area=null
                this.seller_list=null
                this.choose_seller=null
                this.choose_category=null
                this.change_index=null
            },
            save_seller(){
                if(this.change_index!=null){
                    this.fix_case_team_fee_list[this.change_index].seller_id=this.choose_seller
                    for(let item of this.seller_list){
                        if(item.seller_id==this.choose_seller){
                            this.fix_case_team_fee_list[this.change_index].seller_name=item.name
                            this.fix_case_team_fee_list[this.change_index].seller_status=item.status
                        }
                    }
                }else{
                    this.wedding_seller_id=this.choose_seller
                    this.wedding_area_id=this.choose_area
                    for(let item of this.seller_list){
                        if(item.seller_id==this.choose_seller){
                            this.wedding_seller_name=item.name
                            this.wedding_seller_status=item.status
                        }
                    }
                    for(let item of this.area_list){
                        if(item.area_id==this.choose_area){
                            this.wedding_area_name=item.name
                            this.wedding_area_status=item.status
                        }
                    }
                }
                this.seller_open=false
                this.choose_city=null
                this.area_list=null
                this.choose_area=null
                this.seller_list=null
                this.choose_seller=null
                this.choose_category=null
                this.change_index=null
            },
            addseller(val){
                this.seller_open=true
                if(val=='msg'){return}
                this.change_index=val

            },
            delete_wedding_msg(){
                this.wedding_seller_name=null
                this.wedding_seller_status=null
                this.wedding_area_status=null
                this.wedding_seller_id=null
                this.wedding_area_id=null
                this.wedding_area_name=null
            }
		},
        watch:{
            choose_city(value,oldvalue){
                this.area_list=null
                this.choose_area=null
                this.seller_list=null
                this.choose_seller=null
                if(this.choose_category==null){return}
                cmsApi.SellerName(this)
            },
            choose_category(value,oldvalue){
                this.area_list=null
                this.choose_area=null
                this.seller_list=null
                this.choose_seller=null
                if(this.choose_city==null){return}
                cmsApi.SellerName(this)
            },
            choose_seller(value,oldvalue){
                if(value==null){return}
                this.area_list=null
                this.choose_area=null
                cmsApi.area(this)
            },
            'msg':{
                handler(curVal,oldVal){
                    if(!this.$route.query.article_id){
                        localStorage.setItem("case_add_title_1",JSON.stringify(this.title1))
                        localStorage.setItem("case_add_title_2",JSON.stringify(this.title_2_by_id))
                        localStorage.setItem("case_add_title_3",JSON.stringify(this.title_3_by_id))
                        localStorage.setItem("case_add_msg",JSON.stringify(this.msg))
                    }
                },
                deep:true
            }
        },
        computed:{
            article(){
                let msg={}
                if(this.$route.query.article_id){
                    msg.article_id=this.$route.query.article_id
                }
                msg.category=4
                msg.title=this.title
                msg.description=this.description
                return msg
            },
            list_style(){
                let msg={}
                msg.list_style_type='image_1_style'
                msg.url=this.case_img
                return msg
            },
            case_module_list(){
                let allmsg=[]
                for(let type_1 of this.msg){
                    for(let type_2 of type_1.case_module_type_1_list){
                        for(let type_3 of type_2.case_module_type_2_list){
                            let addmsg={}
                            addmsg.case_module_3_id=type_3.case_module_3_id
                            addmsg.case_content_node_list=type_3.content
                            if(type_3.content==null||type_3.content==''){
                                continue
                            }
                            allmsg.push(addmsg)
                        }
                    }
                }
                if(allmsg.length==0){
                    return null
                }
                return allmsg
            },
            case_wedding_info_list(){
                if(!this.title1[4].haschoose){return null}
                let all=[]
                let msg_1={}
                let msg_2={}
                let msg_3={}
                let msg_4={}
                msg_1.id=1
                msg_1.info=this.date
                msg_2.id=2
                msg_2.info=this.wedding_size
                msg_3.id=3
                msg_3.info=this.wedding_seller_id
                msg_4.id=4
                msg_4.info=this.wedding_area_id
                all.push(msg_1,msg_2,msg_3,msg_4)
                return all
            },
            case_team_fee_list(){
                if(!this.title1[5].haschoose){return null}
                let msg=[]
                for(let item of this.fix_case_team_fee_list){
                    let addmsg={}
                    addmsg.team_id=item.team_id
                    addmsg.seller_id=item.seller_id
                    if(item.cost==''){
                        addmsg.cost=null
                    }else{
                        addmsg.cost=item.cost
                    }
                    addmsg.description=item.description
                    msg.push(addmsg)
                }
                return msg
            },
            tag_ids(){
                let allmsg=[]
                for(let item of this.my_tag_ids){
                    allmsg.push(item.tag_id)
                }
                if(allmsg.length==0){return null}
                return allmsg
            }
        },
		components: {
	        Editor,datepicker
	    },
        created(){
            let body=document.querySelector('body')
            let _this=this
            body.addEventListener('mouseover',function(e){
                let nodeclass = e.target.className
                if(nodeclass=='video'){
                    _this.video_show_img=e.target.getAttribute('thumbnail')
                    _this.video_show_top=e.target.offsetParent.offsetTop+e.target.offsetTop-e.target.offsetParent.lastChild.scrollTop
                    _this.video_show_left=e.target.offsetParent.offsetLeft+e.target.offsetLeft+305
                    _this.video_show_open=true
                }
            },false)
            body.addEventListener('mouseout',function(e){
                let nodeclass = e.target.className
                if(nodeclass=='video'){
                    _this.video_show_open=false
                }
            },false)
            CommonApi.signature(this)
            cmsApi.city(this)
            serviceApi.sellerCategoryList(this)
            cmsApi.tag_list(this,3)
            cmsApi.tag_list(this,4)
            if(!this.$route.query.article_id){
                if(localStorage.getItem("case_add_title_1")){
                    this.title1=JSON.parse(localStorage.getItem("case_add_title_1"))
                    this.title_2_by_id=JSON.parse(localStorage.getItem("case_add_title_2"))
                    this.title_3_by_id=JSON.parse(localStorage.getItem("case_add_title_3"))
                    this.msg=JSON.parse(localStorage.getItem("case_add_msg"))
                }
                return
            }
            cmsApi.GetCaseInfo(this)
        }
	}
</script>
<style scoped lang='scss'>
	.cms{
		width: 980px;
		margin: auto;
        .show_img{
            position:absolute;
            height:150px;
            z-index:1;
            img{
                display:block;
                height:100%;
            }
        }
        .order_num{
            width:40px;
            border:none;
            outline:none;
            display:block;
            text-align:center;
            border-radius:6px;
            margin-left:3px;
            margin-right:5px;
        }
		.title{
			margin-top: 20px;
			span{
				font-size: 1.1rem;
				padding: 15px 20px;
				border:1px solid #999999;
				border-bottom: none;
				border-radius: 6px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
				background: white;
			}
		}
		.add_msg{
			width: 100%;
			background: white;
			min-height: 600px;
			border:1px solid #999999;
            padding-bottom:260px;
            .save,.give-up{
                margin-top:50px;
                height: 30px;
                width: 130px;
                text-align:center;
                line-height: 30px;
                background: #53AAE6;
                border-radius:4px;
                color: #fff;
                cursor: pointer;
            }
            .give-up{
                margin-left: 70px;
                background: #E4EBF0;
            }
			.input-box{
				padding-left:5%;
				margin-top:4%;
				font-size: 1rem;
                .tag-box{
                    margin-left:5%;
                    &>p{
                        margin-top:10px;
                        margin-left:10px;
                        float:left;
                        line-height:20px;
                        height:20px;
                        border-radius:6px;
                        padding:0 2px;
                        &>span{
                            padding:0;
                            font-size:0.8rem;
                            border:none;
                            background:none;
                        }
                        .delete_tag{
                            color:white;
                            padding:0 3px;
                            cursor:pointer;
                        }
                    }
                    .open_tag{
                        background:#53AAE6;
                        color:white;
                        padding:2px 4px;
                        cursor:pointer;
                    }
                }
				.important{
					overflow: visible;
					position: relative;
					&:after{
						content:'*';
						position: absolute;
						left: -1rem;
						width: 1rem;
						height: 1rem;
						color: red;
					}
				}
				.word{
					width: 10%;
				}
                .explain{
                    margin-left:20px;
                }
				.getmsg{
					height: 1.2rem;
					font-size: 0.8rem;
					margin-left: 5%;
					width: 48%;
					outline: none;
                    padding: 1%;
				}
                .getdescription{
                    font-family:inherit;
                    height: 3.6rem;
                    font-size: 0.8rem!important;
                    margin-left: 5%;
                    width: 48%;
                    outline: none;
                    max-width: 48%;
                    max-height: 160px;
                    overflow-y: auto;
                    resize: none;
                    padding: 1%;
                }
				.mode{
					padding:0 2%;
					margin-left: 5%;
					width: 70%;
					height: 3rem;
					background: rgba(0,0,0,0.11);
					&>span{
						padding:2px 8px;
						border-radius: 6px;
						font-size: 1rem;
						cursor: pointer;
					}
				}
                .Hq_logo{
                    margin-left:5%;
                    height: 100px;
                    width: 100px;
                    background-image:url(../../../assets/images/form_logo_increase.png);
                    background-repeat: no-repeat;
                    background-size:15% contain;
                    background-position: center 20px;
                    border: 1px solid #E0E0E0;
                    border-radius: 4px;
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    #case_Upload{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        z-index: 3;
                    }
                    img{
                        z-index: 2;
                        position: absolute;
                        display: block;
                        width: auto;
                        height: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                    }
                }
                .Hq_logo:after{
                    position:absolute;
                    content:'点击上传';
                    width: auto;
                    height: 20px;
                    font-size: 12px;
                    color: #7BC3F5;
                    letter-spacing: 0px;
                    font-weight: bold;
                    left: 50%;
                    transform: translate(-50%,65px);
                    z-index: 1
                }
			}
			.module-list-box{
				margin-top: 20px;
				margin-left: 188px;
				width: 70.5%;
				.module-top{
					min-height: 2rem;
					background: rgba(0,0,0,0.2);
					border-top-right-radius: 6px;
					border-top-left-radius: 6px;
					&>p{
						margin-left:10px;
					}
					&>div{
						margin-right: 10px;
						&>p{
							cursor: pointer;
						}
					}
                    .add_title2-box{
                        padding-left:10px;
                        padding-bottom:10px;
                        .title2{
                            &>span{
                                float:left;
                                margin-right:20px;
                                margin-top:10px;
                                display:inline-block;
                                padding:2px 8px;
                                border-radius: 6px;
                                font-size: 1rem;
                                cursor: pointer;
                            }
                        }
                    }
				}
				.module{
                    min-height:2rem;
					background: rgba(0,0,0,0.2);
					border-top: 1px dashed rgba(0,0,0,0.5);
					&>div{
						padding:0 10px 0 20px;
						&>p{
                            margin-left:10px;
						}
					}
                    .msg{
                        padding:0 10px 0 50px;
                        background:rgba(0,0,0,0.1);
                        .title3-top-box{
                            background:rgba(0,0,0,0.01);
                            padding:5px 0;
                            .title3-top{
                                text-align:center;
                                padding:0 10px;
                            }
                        }
                    }
                    .add_title3-box{
                        padding-left:10px;
                        padding-bottom:10px;
                        position:relative;
                        .title3{
                            &>span{
                                float:left;
                                margin-right:20px;
                                margin-top:10px;
                                display:inline-block;
                                padding:2px 8px;
                                border-radius: 6px;
                                font-size: 1rem;
                                cursor: pointer;
                            }
                        }
                    }
				}
			}
            .wedding-list-box{
                font-size:0.8rem;
                margin-top:5%;
                padding-left:5%;
                .add_seller{
                    padding:2px 5px;
                    font-size:0.8rem;
                    background:#7ec7ac;
                    color:white;
                    border-radius:4px;
                    cursor:pointer;
                }
                .seller_name{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .delete{
                    margin-left:5px;
                }
                .title{
                    font-size:1.2rem;
                    font-weight:bold;
                }
                .list{
                    margin-top:50px;
                    padding:0 15% 0 7%;
                    .wedding-list{
                        text-align:center;
                        background:rgba(0,0,0,0.15);
                        border-left:1px solid rgba(0,0,0,0.3);
                        border-top:1px solid rgba(0,0,0,0.3);
                        section{
                            height:2rem;
                            border-right:1px solid rgba(0,0,0,0.3);
                        }
                        &:last-child{
                            border-bottom:1px solid rgba(0,0,0,0.3);
                        }
                        .size{
                            text-align:center;
                            display:block;
                            border:none;
                            outline:none;
                            width:100%;
                            height:100%;
                            background:rgba(0,0,0,0.05);
                        }
                    }
                }
            }
		}
        .title_blue{
            background:#53AAE6;
            color:white;
            position:relative;
            z-index:10;
        }
        .title_blue_unlimited{
            background:#53AAE6;
            color:white;
            position:absolute;
            left:10px;
            z-index:11;
        }
        .choose{
            background:rgb(125,125,125);
        }
        .choose_unlimited{
            background:rgb(125,125,125);
            z-index:9;
        }
        .delete{
            cursor: pointer;
            background:red;
            color:white;
            padding:0 5px;
            border-radius:4px;
        }
        .search_seller{
            width: 400px;
            height:300px;
            background: #FFFFFF;
            box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.33);
            border-radius: 4px;
            position: fixed;
            z-index:2000;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            .title{
                font-weight:bold;
                padding-left:5%;
                font-size:1.1rem;
            }
            .search_list{
                margin-top:25px;
                padding-left:5%;
                .YY-select{
                    width: 200px;
                    margin-left: 30px;
                    outline:none;
                    border:1px solid rgba(0,0,0,0.35);
                    border-radius:4px;
                }
            }
            .make_sure{
                width:300px;
                margin:auto;
                .save{
                    height: 25px;
                    width: 110px;
                    text-align: center;
                    line-height: 25px;
                    background: #53AAE6;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
                .give-up{
                    height: 25px;
                    width: 110px;
                    text-align: center;
                    line-height: 25px;
                    background: #E4EBF0;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
        .search_tag_list{
            padding-bottom:30px;
            width: 800px;
            background: #FFFFFF;
            box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.33);
            border-radius: 4px;
            position: fixed;
            z-index:2000;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            .title{
                font-weight:bold;
                padding-left:5%;
                font-size:1.1rem;
                .tag-box{
                    &>p{
                        margin-top:10px;
                        margin-left:10px;
                        float:left;
                        line-height:20px;
                        height:20px;
                        border-radius:6px;
                        padding:0 2px;
                        &>span{
                            padding:0;
                            font-size:0.8rem;
                            border:none;
                            background:none;
                        }
                        .delete_tag{
                            color:white;
                            padding:0 3px;
                            cursor:pointer;
                        }
                    }
                }
            }
            .search_list{
                margin-top:25px;
                padding-left:5%;
                .YY-select{
                    width: 200px;
                    margin-left: 30px;
                    outline:none;
                    border:1px solid rgba(0,0,0,0.35);
                    border-radius:4px;
                }
                .choose_box{
                    margin-left:4%;
                    width:500px;
                    height:150px;
                    overflow-y:auto;
                    border-radius:6px;
                    padding:2%;
                    border:1px solid rgba(0,0,0,0.3);
                    .tag{
                        margin-left:10px;
                        margin-top:10px;
                        float:left;
                        padding:2px 5px;
                        border-radius:4px;
                        height:1.2rem;
                        line-height:1.2rem;
                        font-size:0.8rem;
                        cursor:pointer;
                        color:white;
                    }
                }
            }
            .make_sure{
                width:300px;
                margin:20px auto 0;
                .save{
                    height: 25px;
                    width: 110px;
                    text-align: center;
                    line-height: 25px;
                    background: #53AAE6;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
                .give-up{
                    height: 25px;
                    width: 110px;
                    text-align: center;
                    line-height: 25px;
                    background: #E4EBF0;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
	}
</style>
