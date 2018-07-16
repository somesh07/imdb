
$(document).ready(() => {

    $('#searchForm').on('submit', (e) =>{
        let searchmovie = $('#searchmovie').val();
        getMovies(searchmovie);
        e.preventDefault();

    });
     $("#result").click(function(){
        $(".leftside").hide();
    });
   
}); 



  getMoviesById = (id) =>{
   return new Promise((resolve,reject)=>{
      $("#loading-image2").css('display','block')
        let requrl = `https://www.omdbapi.com/?apikey=14485a2d&i=${id}`;
        $.ajax({
        url:requrl,
        type:'get',
        async:true,
        success: function(res) {  
               resolve(res);

            },
        error: function(xhr,status,res){
            reject(xhr)
        }
        })
    })

  }


let getMovies = (searchmovie) =>{
    
    $("#loading-image").css('display','block')
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com/?apikey=14485a2d&s=' +searchmovie ,
        success: (response) => {
            $("#loading-image").css('display','none')

          if(response.Response != 'False')
            {

                $('.mainbody').css('display','block')
                 let allMovie = response.Search;
            let resultMovie = $('#result');
            resultMovie.empty();
            for(let movie of allMovie){

            let title = movie.Title;
            let imbdId = movie.imdbID;
            let liMovie = $('<li class = "movieList">');
            let posterImage = $('<img src="' +movie.Poster + '" class="img-responsive" width="30" />');
           
            resultMovie.append(liMovie);
            liMovie.append(posterImage);
             liMovie.append(`<p class="title"> ${title} </p>`);
          
            liMovie.append('</li>');

            liMovie.on('click',(e)=>{

                   getMoviesById(imbdId).then(mov=>{

                    let detail_html = `<div class="well sponsor">
                    <div class ="row">
                  
                      <div class="col">
                      <h2 style="margin-bottom: 0.4em;">${mov.Title}(${mov.Year})</h2>
                        <span style="float: left; margin-right: 15px;"><img src="${mov.Poster}" width="170" height="250" class="img-responsive"></span>
                      </div>
                       <div class="col">
                      
                        <ul class="" style='list-style-type: none;'>
                            <li ><strong>Director</strong> : ${mov.Director}</li>
                            <li ><strong>Stars</strong> : ${mov.Actors}</li>
                            <li ><strong>Rated</strong> : ${mov.Rated}</li>
                            <li ><strong>Released</strong> : ${mov.Released}</li>
                            <li ><strong>Language</strong> : ${mov.Language}</li>
                            <li ><strong>Genres</strong> : ${mov.Genre}</li>
                            <li ><strong>Writers</strong>: ${mov.Writer}</li>
                            <li ><strong>Metascore</strong>: ${mov.Metascore}</li>
                            <li ><strong>ImdbRatings</strong> : ${mov.imdbRating}</li>
                            <li ><strong>Imdb Votes</strong> : ${mov.imdbVotes}</li>
                            <li ><strong>Type</strong> : ${mov.Type}</li>
                            <li ><strong>Country</strong> : ${mov.Country}</li>
                            <li ><strong>Award</strong> : ${mov.Awards}</li>
                            <li ><strong>Productions</strong> : ${mov.Production}</li>
                            <li ><strong>Runtimes</strong> : ${mov.Runtime}</li>
                            <li ><strong>DVD</strong> : ${mov.DVD}</li>
                            <li ><strong>Boxoffice</strong> : ${mov.BoxOffice}</li>
                            <li ><strong>Website</strong> :${mov.Website}</li>

                        </ul>

                        </div>
                        </div>
                        <p>
                       ${mov.Plot}
                        </p>

                    </div>
                `;

                $(".rightside").html(detail_html);
        
                   }).catch(err=>{
                    console.log('Error ====>',err)
                   })
                  
                   })

            }
      
            }

         },
         error: (data) => { 

            alert("some error occured")

        },

    });

}




   