var postsLink = 'https://jsonplaceholder.typicode.com/posts';
var commentsLink = 'https://jsonplaceholder.typicode.com/comments?postId=';
var albumsLink = 'https://jsonplaceholder.typicode.com/albums';


Vue.component('thepost', {
  props: ['pid', 'posttitle', 'postbody'],

  template: `

  	<div class="panel panel-primary">
		<div class="panel-heading">
		    <h3 class="panel-title">{{posttitle}}</h3>
		 </div>
		 <div class="panel-body">
		    {{postbody}}
		 </div>
		 <div class="panel-footer">
		 	<button data-toggle="collapse" data-parent="#accordion" data-target="#postid" v-on:click="showComment()">Comments</button>
		 	<div id="postid" class="collapse">
		 		<slot name="comment">There should be comment</slot>
		 	</div>
		 	
		</div>
	</div>

  `,

  methods:{

    showComment: function(){
    	this.$emit('pressed');
    	},

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

new Vue({

	el: '#root',

	data:{
		postsList: null,
		commentsList: null,
		albumsList: null,
			
	},

	methods:{

        
        getPosts: function(){
	        this.$http.get(postsLink).then(function(response){
	            this.postsList = response.data;
	        }, function(error){
	            console.log(error.statusText);
	        });
    	},

    	getComments: function(passedId){
    		this.$http.get(commentsLink + passedId).then(function(response){
                this.commentsList = response.data;
            }, function(error){
                console.log(error.statusText);
            });
        	
        },
    

        getAlbums: function(){
        	this.$http.get(albumsLink).then(function(response){
                this.albumsList = response.data;
            }, function(error){
                console.log(error.statusText);
            });
        }
    },

    mounted: function () {
        this.getPosts();
        this.getComments();
    },

});



