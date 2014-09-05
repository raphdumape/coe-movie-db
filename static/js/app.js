
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = '8ff23636e900893e4c4f84acaf8f95f6';
    var api_key = '8ff23636e900893e4c4f84acaf8f95f6';

   
    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: '8ff23636e900893e4c4f84acaf8f95f6'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.show').click(function() {
            loadNowShowing();
            return  false;
        });

        $('.upcoming').click(function() {
            loadUpcoming();
            return  false;
        });

        $('.popular').click(function() {
            loadPopular();
            return  false;
        });

        $('.toprated').click(function() {
            loadTopRated();
            return  false;
        })
;
        loadNowShowing();
    }

 
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

 function displayMovies(data){
            
            data.results.forEach(function(movie){
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            var backdrop = config.images.base_url + config.images.poster_sizes[6] + movie.backdrop_path;
            var noimg1 = 'http://talk-about-failures.com/post_pic/placeholder_noImage_bw.png';


            if (backdrop.length >= 66){
            var    display = backdrop;
            }else{
            var    display = noimg1
            }
               var object = {
                    "movie-id" : movie.id,
                    "img" : imageSrc,
                    "title": movie.title,
                    "backdrop" : display
               };

        var raw = $("#tpl-displaymovies").html();
        var template = Handlebars.compile(raw);
        var html = template(object);
        $('.movies-list').append(html);

         showCast(movie.id);

        });
        $("a[data-id]").click(function() {
        putid( $(this).attr("data-id"));
        
    });
        }

function showCast(id){
    reqParam = {api_key:api_key};
         url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
         for(var i=0;i<4;i++){

            $('#'+id).append('<li class="lineblock"> <strong>'+ response.cast[i].name +',</strong></li>');
            }


        });

}  

 function putid(id){
      $('.modal-content').empty().append(); 
       url = baseUrl + "movie/"+id;
        reqParam = {api_key:api_key};
        $.get(url,reqParam,function(response){ 
        var imageSrc = config.images.base_url + config.images.poster_sizes[3] + response.poster_path;
        var overview = response.overview;
        var title = response.title;
        var tagline = response.tagline;

        if (response.genres.length == 0 ){
            genre1 = "";
        }else{
             genre1 = response.genres[0].name;  
        }


        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){

           if (response.results.length == 0) {vid = "";}else{vid = response.results[0].key;
                                        console.log('notempty');}


        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
        if (response.crew.length < 1){
            director = ""; 
        }else{

             director = response.crew[0].name;
        }

        if (response.cast.length < 3){
        var cast0 = " ";
        var cast1 = " ";
        var cast2 = " ";
        var cast3 = " ";
        }else{
        var cast0 = response.cast[0].name;
        var cast1 = response.cast[1].name;
        var cast2 = response.cast[2].name;
        var cast3 = response.cast[3].name;
        var pic0 = config.images.base_url + config.images.poster_sizes[2] + response.cast[0].profile_path;
        var pic1 = config.images.base_url + config.images.poster_sizes[2] + response.cast[1].profile_path;
        var pic2 = config.images.base_url + config.images.poster_sizes[2] + response.cast[2].profile_path;
        var pic3 = config.images.base_url + config.images.poster_sizes[2] + response.cast[3].profile_path;
        }


            var object = {
                    "id" : id,
                    "overview" : overview,
                    "title": title,
                    "tagline" : tagline,
                    "img" : imageSrc,
                    "genre1" : genre1,
                    "video" : vid,
                    "cast0" : cast0,
                    "cast1" : cast1,
                    "cast2" : cast2,
                    "cast3" : cast3,
                    "dir" : director,
                    "pic0" : pic0,
                    "pic1" : pic1,
                    "pic2" : pic2,
                    "pic3" : pic3,

               };

        var raw = $("#tpl-displaySpecific").html();
        var template = Handlebars.compile(raw);
        var html = template(object);
        $('.modal-content').append(html); 

         url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var poster = config.images.base_url + config.images.poster_sizes[1];
            for(var i=0;i<movies.length;i++){
                allMovies += '<div class="col-md-3">'+
                                '<a href="#'+movies[i].id+'" data-id2="'+movies[i].id+'" class="clickhere">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="#'+movies[i].id+'" data-id2="'+movies[i].id+' class="clickhere"">'+movies[i].title+'</a>'+
                                '</h5>'+
                              '</div>';
                  
            }
          
$('#sim'+id).append(allMovies);

                 });
             });
         });
     });
    showcar(id);

    $(".clickhere").click(function() {
         $('.modal-content').empty().append(); 
    });
 }

    function showcar(id){

    reqParam = {api_key:api_key};
         url = baseUrl + "movie/"+id+"/images";
        $.get(url,reqParam,function(response){
            var imageSrc3 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[0].file_path;
            var imageSrc4 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[1].file_path;
            var imageSrc5 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[2].file_path;
            var imageSrc6 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[3].file_path;
            var imageSrc7 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[4].file_path;
            

               var object = {
                 "img1" : imageSrc3,
                 "img2" : imageSrc4,
                 "img3" : imageSrc5,
                 "img4" : imageSrc6,
                 "img5" : imageSrc7

               };

        var raw = $("#tpl-displayCar").html();
        var template = Handlebars.compile(raw);
        var html = template(object);
        $('.modal-content').append(html); 

        });

}  


    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

   

    function loadUpcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadTopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    initialize(setEventHandlers);
