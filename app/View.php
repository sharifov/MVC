<?php
class View
{

    // Значение по умольчанию
    public $data = ['title'=>'My App', 'flash'=>'', 'notice'=>''];

    // Получаем допольнительные параметри с помощью конструктора
    public function __construct($layout, $accessData){

        // берем флеш Сообшения из сессии
        if(isset($_SESSION['flash'])){
            $this->data['flash'] = $_SESSION['flash'];
            unset($_SESSION['flash']);
        }

        if(isset($layout)){
            $this->layout = $layout;
        }

        if(!empty($accessData)){
            $this->data = array_merge($this->data, $accessData);
        }
    }

    // Для вывода вида
	public function render($content_view, $data = null)
	{
        //Если есть пользовательские данные добавляем их тож в наш Массив для страницы
		if(is_array($data)) $this->data = array_merge($this->data, $data);

        // Извлечение массива в переменную
        extract($this->data);
		
        // Подключаем определенный шаблон вида
		include 'app/views/layouts/'.$this->layout.'.php';
	}

    public function route($route){
        return 'http://'.$_SERVER['HTTP_HOST'].'/'.$route;
    }

    public function csrf(){
        return '<input type="hidden" name="csrf" value="'.$_SESSION['csrf'].'"/>';
    }
}