$('.nav-link').on('click', function(){
    //ambil value dari link yang diklik pada attribute href
    const target = $(this).attr('href');
    //ambil 1 section
    const sectionTarget = $(target);

    $('html, body').animate({
        scrollTop: sectionTarget.offset().top - 60
    },1000, 'easeInOutExpo')
})

$(window).on('load',function(){
    $('.card-animate').addClass('from-top');
    $('.title').addClass('from-left');
})

$(window).scroll(function(){
    const wScroll = $(this).scrollTop();

    $('.jumbotron h1').css({
        'transform' : `translate(0px , ${wScroll/1.8}%)`
    })

    $('.jumbotron p').css({
        'transform' : `translate(0px , ${wScroll/1.2}%)`
    })

    $('.jumbotron button').css({
        'transform' : `translate(0px , ${wScroll/18}%)`
    })


    if(wScroll > $('#search').offset().top - 500){
        $('.animate').addClass('from-top');
    }
});

//funsi untuk menampilkan list film yang dicari
function showFilmList(){
    $('#movie-list').html('');

    $.ajax({
        url : 'http://www.omdbapi.com',
        type : 'get',
        dataType : 'json',
        data : {
            'apikey' : '4a9f1ff7',
            's' : $('#search-input').val()
        },

        success : function(result){
            if(result.Response == "True"){
                let movies = result.Search;
                console.log(movies);

                $.each(movies, function(i, data){
                    $('#search #movie-list').append(`
                        <div class="col-md-4 mt-4">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}" id="see-detail">See detail</a>
                                </div>
                            </div>
                        </div>
                    `)
                })
            }else{
                $('#search #movie-list').html(
                    `<div class='col'>
                        <h2 class='text-center'>${result.Error}</h2>
                    </div>`
                )
            }
        }
    });
}

$('#button-addon2').on('click', function(){
    showFilmList();
});

$('#search-input').on('keypress',function(e){
    if(e.which == 13){
        showFilmList();
    }
})

$('#movie-list').on('click', '#see-detail', function(){

    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '4a9f1ff7',
            'i' : $(this).data('id')
        },

        success: function(movie){
            if(movie.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" alt="Film Poster" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <h3>${movie.Title}</h3>
                                <p>Director: ${movie.Director}</p>
                                <p>Released: ${movie.Released}</p>
                                <p>Actors: ${movie.Actors}</p>
                                <p>Genre: ${movie.Genre}</p>
                            </div>
                        </div>
                    
                `)
            }
        }
    })
})
