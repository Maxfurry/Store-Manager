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

  it('Should return Request must contain user name if there is no username', (done) => {
    const noUser = {
      name: '',
      password: 'User',
    };

    chai.request(server)
      .post('/api/v1/auth/login')
      .send(noUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain user name');
        done();
      });
  });

  it('Should return Request must contain password of user if there is no password', (done) => {
    const noPassword = {
      name: 'User',
      password: '',
    };

    chai.request(server)
      .post('/api/v1/auth/login')
      .send(noPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain password of user');
        done();
      });
  });

  it('Should return Request must contain role of user if there is no role', (done) => {
    const noRole = {
      name: 'User',
      password: 'user',
      role: '',
      position: 'attendant',
    };

    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noRole)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain role of user');
        done();
      });
  });

  it('Should return Request must contain position of user if there is no position', (done) => {
    const noPosition = {
      name: 'User',
      password: 'user',
      role: 'user',
      position: '',
    };

    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noPosition)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain position of user');
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
