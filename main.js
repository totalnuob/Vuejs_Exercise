var postsLink = 'https://jsonplaceholder.typicode.com/posts';
var commentsLink = 'https://jsonplaceholder.typicode.com/comments?postId=';
var albumsLink = 'https://jsonplaceholder.typicode.com/albums';
var photosLink = 'https://jsonplaceholder.typicode.com/photos?albumId=';



const thepost = {
  props: ['pid', 'posttitle', 'postbody'],

  data: function() {

  	return{
  		postsList: [],
  		commentsList: [],
  		buttonState: false,
  	}

  },


  template: `
  	<div>
	  	<div class="panel panel-primary" v-for="post in postsList">
			<div class="panel-heading">
			    <h3 class="panel-title">{{post.title}}</h3>
			 </div>
			 <div class="panel-body">
			    {{post.body}}
			 </div>
			 <div class="panel-footer">
			 	<template>
				 	<button v-on:click="getComments(post.id, buttonState)">Comments</button>
				 	<div>
				 		<thecomment v-for="comment in commentsList" v-if="post.id==comment.postId&&buttonState" :comname="comment.name" :comemail="comment.email" :combody="comment.body"></thecomment>
				 	</div>
			 	</template>
			</div>
		</div>
	</div>
  `,

  	methods:{


		getPosts: function(){
		    this.$http.get(postsLink).then(function(response){
		        this.postsList = response.data;
		    }, function(error){
		        console.log(error.statusText);
		    });
		},

		getComments: function(passedId, buttonState){
    		this.$http.get(commentsLink + passedId).then(function(response){
                this.commentsList = response.data;
            }, function(error){
                console.log(error.statusText);
            });
            if(buttonState == false){
            	this.buttonState = true;
            }
            else{
            	this.buttonState = false;
            }
        	
        },


	},


	mounted: function () {
        this.getPosts();
    },


};


Vue.component('thecomment', {

	props: ['comname', 'comemail', 'combody'],

	template: `
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4 class="panel-title">{{comname}} </h4>
			</div>	
			<div class="panel-body">
				{{combody}} 
			</div>
			<div class="panel-footer">
				{{comemail}}
			</div>
		</div> 
	`,

});


const thealbum = {

	props: ['id'],

	data: function() {

	  	return{
	  		albumsList: [],
	  	}

  	},

	template: `
		<div>
			<div class="jumbotron" v-for="album in albumsList">
				<h2>{{album.title}}</h2>
				<router-link :to="{path: 'photos', query: {id: album.id}}" class="btn btn-info" role="button" target="_blank">Watch</router-link>
			</div>
			<router-view></router-view>
		</div>
	`,

	methods:{


    getAlbums: function(){
        	this.$http.get(albumsLink).then(function(response){
                this.albumsList = response.data;
            }, function(error){
                console.log(error.statusText);
            });
        },

	},

	
	mounted: function () {
        this.getAlbums();
    },

};

const thephotos = {


	props: ['id'],

	data: function(){
		return{
			thephotosList: [],
		}
	},

	template: `
		

		<div class="container" :id="getThem">
		  <div class="col-xs-4 col-md-2" v-for="photo in thephotosList">
		    <div class="thumbnail">
		      <a :href="photo.url" data-fancybox="images" :data-caption="photo.title">
		      	<img :src="photo.thumbnailUrl" alt="">
		      </a>
		    </div>
		  </div>
		</div>
	
	`,

	

	computed:{
		getThem: function(){
				this.$http.get(photosLink + this.$route.query.id).then(function(response){
		                this.thephotosList = response.data;
		            }, function(error){
		                console.log(error.statusText);
		            });
		}
	}

}



const router = new VueRouter({
  routes: [
    { path: '/photos', component: thephotos},
    { path: '/posts', component: thepost},
    { path: '/albums', component: thealbum}
  ]
});

new Vue({

	router,

	el: '#app',

	created() {
		
	},

	data:{
		
		currentView: 'thepost',
			
	},


    mounted: function () {
        
  
    },

}).$mount('#app')

