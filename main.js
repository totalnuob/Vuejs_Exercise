var postsLink = 'https://jsonplaceholder.typicode.com/posts';
var commentsLink = 'https://jsonplaceholder.typicode.com/comments?postId=';
var albumsLink = 'https://jsonplaceholder.typicode.com/albums';
var photosLink = 'https://jsonplaceholder.typicode.com/photos?albumId=';



Vue.component('thepost', {
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


});


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


Vue.component('thealbum', {

	props: ['albumtitle', 'albumid'],

	data: function() {

	  	return{
	  		albumsList: [],
			photosList: [],
	  	}

  	},

	template: `
		<div>
			<div class="jumbotron" v-for="album in albumsList">
				<h2>{{album.title}}</h2>
				<a class="btn btn-primary btn-lg" role="button" v-on:click="getPhotos(album.id)">Watch</a>
				
			</div>
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

    getPhotos: function(id){
			bus.$emit('pressed', id)
	},


	},

	
	mounted: function () {
        this.getAlbums();
    },

});

const thephotos = {


	props: ['id'],

	data: function(){
		return{
			thephotosList: [],
		}
	},

	template: `
		
		<div class="row">
		<div class="container">
		
		  <div class="col-xs-6 col-md-3">
		    <div class="thumbnail" v-for="photo in thephotosList">
		      <img src="photo.thumbnailUrl" alt="photo.title">
		      <div class="caption">
		        <h3>{{photo.id}}</h3>
		      </div>
		    </div>
		  </div>
		 
		</div>
		</div>
	
	`,

	created: function(){
		bus.$on('pressed', function(id){
			this.$http.get(photosLink + id).then(function(response){
                vm.thephotosList = response.data;
            }, function(error){
                console.log(error.statusText);
            });
		})
	},



}


const bus = new Vue()


const router = new VueRouter({
  routes: [
    { path: '/thephotos', component: thephotos, props: (route) => ({ query: route.query.id }) }
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









