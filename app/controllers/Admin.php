<?php
class Admin extends Controller
{
    public $layout = 'admin';
	
	public function index()
	{
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
		
        $users = $this->model->findAll();
		
		$is_login = $this->filterAdmin();
		
		if(!$is_login) $this->view->setLayout('auth');
		
		$this->view->render('index', ['is_login'=>$is_login,'users'=>$users]);
	}

    public function usercreate(){

        $var = [];

        if($this->isPost() && isset($_POST['createuser'])){

            $_POST['username'] = $this->clear($_POST['username']);
            $_POST['password'] = $this->clear($_POST['password']);

            if(empty($_POST['username'])){
                
                $var['notice'] = 'Логин пользователя не корректный!';
            
            }elseif(empty($_POST['password'])){

                $var['notice'] = 'Пароль пользователя не корректный!';

            }else{
               
                $_POST['is_admin'] = isset($_POST['is_admin']) ? 1 : 0;

                $this->model->insert([
                    'username' => $_POST['username'],
                    'password' => $this->hash($_POST['password']),
                    'is_admin' => $_POST['is_admin'],
                    'password_text' => $_POST['password']
                ]);

                $this->redirect('admin', 'Пользовател успешно был добавлен в базу');
            }

        }

        // Исполнение Вида - Авторизации
        $this->view->render('usercreate', $var);
    }

    // Удаление пользователя через AJAX
    public function userdelete($id){
        // Проверка запроса на AJAX - если не AJAX то сбрасывает нас
        $this->checkAJAX();

        if($this->model->delete($this->clear($id, true))){
            print 'Пользователь успешно был удален!';
        }
    }

    // Редактирование поьзователя
    public function useredit($id){

        $id = $this->clear($id);

        $var = $this->model->findWhere([
                ['id', '=', $id ]
            ]);

		if(!$var) $this->redirect('admin', 'Такого пользователя нет!');
			
        if($this->isPost() && isset($_POST['createuser'])){

            $_POST['username'] = $this->clear($_POST['username']);
            $_POST['password'] = $this->clear($_POST['password']);

            if(empty($_POST['username'])){
                
                $var['notice'] = 'Логин пользователя не корректный!';
            
            }elseif(empty($_POST['password'])){

                $var['notice'] = 'Пароль пользователя не корректный!';

            }else{
               
                $_POST['is_admin'] = isset($_POST['is_admin']) ? 1 : 0;

                $this->model->update($id, [
                    'username' => $_POST['username'],
                    'password' => $this->hash($_POST['password']),
                    'is_admin' => $_POST['is_admin'],
                    'password_text' => $_POST['password']
                ]);

                $this->redirect('admin', 'Пользовател успешно был изменен!');
            }

        }

        // Исполнение Вида - Авторизации
        $this->view->render('useredit', $var);
    }
	
}