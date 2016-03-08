<table cellspacing="4" cellpadding="0" border="1" width="100%">
    <tr>
        <th>ID</th>
        <th>Логин</th>
        <th>Пароль</th>
        <th>Является ли админом</th>
        <th>Редактировать</th>
        <th>Удалить</th>
    </tr>
    <?foreach($users as $user):?>
        <tr>
            <td><?=$user->id?></td>
            <td><?=$user->username?></td>
            <td><?=$user->password?></td>
            <td><?=$user->is_admin ? 'Да' : 'Нет' ?></td>
            <td>
                <a class="orange" href="<?=$this->route('admin/useredit/'.$user->id)?>">Редактировать</a>
            </td>
            <td>
                <a class="red" href="<?=$this->route('admin/userdelete/'.$user->id)?>">Удалить</a>
            </td>
        </tr>
    <?endforeach?>
</table>
<?=$this->csrf()?>