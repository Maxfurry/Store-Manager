import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import checkAuth from '../middlewares/checkAuth';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

const user = {
  name: 'Adeniran Mark',
  role: 'admin',
  position: 'Manager',
  password: 'magag',
};

const loginUser = {
  name: 'Adeniran Mark',
  password: 'magag',
};

describe('/POST authenticate', () => {
    it('It should login users with valid token', (done) => {
        chai.request(server)
        .post('/api/v1/auth/login')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3);
            done();
        });
    });
});