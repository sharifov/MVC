<form method="post" action="" class="createuser">
    <label>Логин пользователя:</label>
    <input type="text" name="username" value="<?=$username?>"><br/><br/>
    <label>Пароль пользователя:</label>
    <input type="text" name="password" value="<?=$password_text?>"><br/><br/>
    <label>Является ли админом:</label>
    <input type="checkbox" name="is_admin" <?=$is_admin?'checked="checked"':null?> ><br/><br/>
    <?=$this->csrf()?>
    <input type="submit" class="btn radius" name="createuser" value="Отправить"/>
</form>
