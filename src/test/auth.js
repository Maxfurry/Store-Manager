import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);


const loginAdmin = {
  name: 'Admin',
  password: 'admin',
};

const register = {
  name: 'User',
  password: 'User',
  role: 'user',
  position: 'attendant',
};

const loginUser = {
  name: 'User',
  password: 'User',
};

//  Test POST endpoint for User
describe('API endpoint POST /auth/', () => {
  it('Should login admin', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginAdmin)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('token');
        process.env.JWT_TEST_ADMIN = res.body.token;
        res.body.should.have.property('message').eql('Login Successful');
        done();
      });
  });

  it('Should register user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(register)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('info').should.be.an('object');
        res.body.should.have.property('message').eql('User Created Successfully');
        done();
      });
  });

  it('Should login user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginUser)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('token');
        process.env.JWT_TEST_USER = res.body.token;
        res.body.should.have.property('message').eql('Login Successful');
        done();
      });
  });

  it('Should check valid token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(register)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('err').should.be.an('object');
        res.body.should.have.property('message').eql('Authentication fail, Please provide valid Token');
        done();
      });
  });

  it('Should check priviledge', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .send(register)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('err').should.be.an('object');
        res.body.should.have.property('message').eql('You are not authorized');
        done();
      });
  });
});
