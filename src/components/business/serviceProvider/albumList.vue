<template>
	<div class="album-list" flex="dir:top">
		<div flex='dir:left' class='list-box' v-for="(item,index) in msg">
			<div flex-box='0' flex="dir:top cross:bottom" class='time'>
				<p class="year">{{item.create_time | getyear}}</p>
				<p class="hour">{{item.create_time | gettime}}</p>
			</div>
			<div flex-box='1' class='msg' flex='dir:left'>
				<div class="delete" flex-box="0">
					<span @click="delete_list(item.feed_id)">删除</span>
				</div>
				<div class="msg-box" flex-box="1">
					<div class="pic-box" v-if="item.type==2">
						<img :src="items+'@!gif'" v-for="items in item.feed_url">
					</div>
					<div class="video-box" v-if="item.type==1" flex="dir:left">
                        <iframe width="300" height="210" frameborder="0" :src="'https://player.youku.com/embed/'+item.video_id" allowfullscreen=""></iframe>
                        <span flex-box="0" class="cover_msg">封面图:</span>
                        <div class="cover-box" flex-box="0">
                            <img class="cover" :src="item.video_cover+'@!gif'">
                        </div>
					</div>
					<p class="explain">简介描述：</p>
					<p class="explain-msg">{{item.description}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import albumApi from '../../../api/album'
	export default {
		data(){
			return{
			}
		},
		name:'album-list',
    	methods:{
            delete_list(id){
                albumApi.UpdateCaseFeedStatus(this,id,albumApi.getlist)
            }
  		},
  		computed:{
            msg(){
                return this.$store.state.album.list
            }
		},
        filters:{
            getyear:function(value){
                return new Date(value).toISOString().substr(0, 10)
            },
            gettime:function(value){
                return new Date(value).toLocaleString().substr(10, 15)
            }
        }
	}
</script>
<style scoped lang='scss'>
	.album-list{
		width: 800px;
		padding: 20px 80px 50px 80px;
		background: white;
		margin: 20px auto 0;
		.list-box{
			margin-bottom: 25px;
            overflow: hidden;
			.time{
				position: relative;
				.year{
					font-size: 1.25rem;
				}
				.hour{
					margin-top: 10px;
					font-size: 0.8rem;
					word-spacing: 2px;
					letter-spacing: 2px;
				}
				&:after{
					content: '';
					position: absolute;
					border-left:2px dashed rgba(0,0,0,0.5);
					height: 100%;
					width: 1px;
					top: 60px;
					left: 75%;

				}
			}
			.msg{
				margin-left: 50px;
				.delete{
					width: 70px;
					span{
						cursor: pointer;
						display: inline-block;
						padding:0 8px;
						background: red;
						line-height: 1.4rem;
						font-size: 0.8rem;
						color: white;
						border-radius: 8px;
					}
				}
				.msg-box{
                    .video-box{
                        .cover_msg{
                            margin:0 10px;
                        }
                        .cover{
                            max-width:150px;
                            max-height:150px;
                            display:block;
                        }
                    }
					.pic-box{
						width: 100%;
						img{
							height: 80px;
							margin-right: 10px;
							margin-bottom: 10px;
							display: block;
							float: left;
						}
						&:after{
							content:".";
							display:block;
							height:0;
							clear:both;
							visibility:hidden;
						}
					}
				}
				.explain{
					margin-top: 10px;
					font-size: 1.2rem;
					font-weight: bold;
				}
				.explain-msg{
					font-size: 0.8rem;
					margin-top: 3px;
					color: rgba(0,0,0,0.6)
				}
			}
		}
	}
</style>
