const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

let token,movieId;

describe('Node Server',()=>{
    before((done)=>{
       chai.request(server)
       .post('/authenticate')
       .send({username:'yunver1',password:'12345'})
       .end((err,res)=>{
           token=res.body.token;
           
           done();
       });
    });

    describe('/GET movies', () => {
		it('it should GET all the movies', (done) => {
			chai.request(server)
				.get('/api/movie')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
});

    
    describe('/POST movies',()=>{
        it('it should Post movies',(done)=>{
            const movie={
                title:'Udemyyyyy',
                director_id:'5b159ed37001d83217c574e4',
                category:'Komedi',
                country:'Türkiye',
                year:1950,
                imdb_score:9
            };
            chai.request(server)
            .post('/api/movie')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId=res.body._id;
                done();
            });

        });
    });

    describe('/GET/:movie_id movie',()=>{
        it('it should Get a movie by the given id',(done)=>{
            chai.request(server)
            .get('/api/movie/'+movieId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('_id').eql(movieId);
                done();
            });
        });
    });

    describe('/PUT/:movie_id movie',()=>{
        it('it should Update a movie by the given id',(done)=>{
            const movie={
                title:'Udemyyyyy1234',
                director_id:'5b159ed37001d83217c574e1',
                category:'Suç',
                country:'Almanya',
                year:1954,
                imdb_score:4
            };

            chai.request(server)
            .put('/api/movie/'+movieId)
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                
                done();
            });
        });
    });

    describe('/Delete/:movie_id movie',()=>{
        it('it should Delete a movie by the given id',(done)=>{
          

            chai.request(server)
            .delete('/api/movie/'+movieId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('status').eql(1);
                
                done();
            });
        });
    });
}); 