<?php
class Main extends Controller
{
	public $before = ['csrf'];

	public function index()
	{

        if(isset($_SESSION['admin']))  $this->redirect('admin');

        $arr = [];

        if($this->isPost() && isset($_POST['admin'])){

            $_POST['username'] = $this->clear($_POST['username']);
            $_POST['password'] = $this->clear($_POST['password']);

            $res = $this->model->findWhere([
                ['username', '=', $_POST['username'] ],
                ['password', '=', $this->hash($_POST['password']) ],
                ['is_admin', '=', 1]
            ], 'users');

            if(!$res){
                $arr['notice'] = 'Доступ не провильный!';
            }else{
                $this->login($res['username'], true);
                $this->redirect('admin');
            }
        }

        // Исполнение Вида - Главной странице
        $this->view->render('main', $arr);
	}
}