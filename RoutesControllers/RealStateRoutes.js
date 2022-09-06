const express= require('express');
const State= require('../Controllers/RealStateControllers');
const Auth= require('../Controllers/AuthControllers');
const router = express.Router();

router.route('/').get( State.GetAllRealState)


    router.route('/')
    .post(Auth.Protected, Auth.ResterictTo('admin','dealer','employee','advisor'),
    State.CreateRealStateNumber,
    State.ImageHandller ,State.PostRealState);
    
    router.route('/getmyrealstate').get(Auth.Protected,Auth.ResterictTo('admin','dealer','employee','advisor', "user"),State.unShowRealState,State.GetMyRealState);


    router.route('/:id').get(State.GetOneState);

    router.route('/getallarea')
    .post(State.GetAllArea);

    router.route('/getallcity')
    .post(State.GetAllCity);

    router.use(Auth.Protected);


    router.route('/writearea')
    .post(State.WriteArea);

    router.route('/getarea')
    .post(State.FindArea);
    router.route('/deletearea')
    .post(State.FilterArea);


    router.route('/writecity')
    .post(State.WriteCity);
    router.route('/getcity')
    .post(State.FindCity);
    router.route('/deletecity')
    .post(State.FilterCity);

    router.use(Auth.ResterictTo('admin','dealer','employee','advisor'));



    router.route('/:id').patch(State.DeleteImageExtra ,State.ImageHandller ,State.UpdateRealState).
    delete(State.DeleteOneRealState);


module.exports= router;

