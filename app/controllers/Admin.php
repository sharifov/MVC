<?php
class Admin extends Controller
{
    public $before = ['admin', 'csrf'];
    public $layout = 'admin';
	
	public function index()
	{
        $users = $this->model->findAll();

        // Исполнение Вида - Авторизации
		$this->view->render('admin', ['users'=>$users]);
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
        $this->view->render('admin_usercreate', $var);
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
        $this->view->render('admin_useredit', $var);
    }

    public function logout(){
        parent::logout();
    }
}