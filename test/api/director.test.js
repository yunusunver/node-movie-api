
const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);

let token,director_id;

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

describe('/Get directors',()=>{
    it('it should get all directors',(done)=>{
        chai.request(server)
        .get('/api/director')
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

describe('/Post directors',()=>{
    it('it should post a directors',(done)=>{
        const director={
            name:'nuri bilge',
            surname:'ceylan',
            bio:'filmleri'
        };

        chai.request(server)
        .post('/api/director')
        .send(director)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('surname');
            res.body.should.have.property('bio');
            director_id=res.body._id;
            done();
        });
    });
});
/*
describe('/get/:directorid',()=>{
    it('it should Get a director by the given id',(done)=>{
        chai.request(server)
        .get('/api/director/'+director_id)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('name');
            res.body.should.have.property('surname');
            res.body.should.have.property('bio');
            res.body.should.have.property('_id').eql(director_id);
            done();
        });
    });
});
*/
describe('/put/:director_id',()=>{
    it('it should put a director by the given id',(done)=>{
        const director={
            name:'cem',
            surname:'yılmaz',
            bio:'komedi filmleri'
        };

        chai.request(server)
        .put('/api/director/'+director_id)
        .send(director)
        .set('x-access-token',token)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('name').eql(director.name);
            res.body.should.have.property('surname').eql(director.surname);
            res.body.should.have.property('bio').eql(director.bio);
            done();

        });
    });
});

describe('/Delete/:director_id',()=>{
    it('it should delete a director by given id',(done)=>{
        chai.request(server)
        .delete('/api/director/'+director_id)
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