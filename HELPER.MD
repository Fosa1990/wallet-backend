[Backend](https://github.com/Fosa1990/wallet-backend)

1. Склонувати
2. Прописати у консолі npm ci
3. Запустити npm run start:dev

Маршрути Авторизації: src/routes/api/auth.js [POST] Реєстрація =
http://localhost:8081/api/auth/signup ] { "name": "User Name",
"email":"user@email", "password":"password" } [POST] Логін =
http://localhost:8081/api/auth/signin ] { "email":"user@email",
"password":"password" } [GET] Логаут = http://localhost:8081/api/auth/signout ]
{ Authorization = Bearer token }

Маршрути Користувача: src/routes/api/users.js [GET] Дані по поточному
користувачеві = [ http://localhost:8081/api/users/current ] { Authorization =
Bearer token } [PATCH] Дані по аватару користувача = [
http://localhost:8081/api/users/avatars ] { Authorization = Bearer token } -
ПОКИ НЕ ПРАЦЮЄ. Раути signin/current - дають аватарку. [POST] Повторна
авторизація користувача по email = [ http://localhost:8081/api/users/verify ]
<=== Це повторно надсилає лист на авторизації на email [GET] Первинна
авторизація користувача оп token = [
http://localhost:8081/api/users/verify/:verificationToken ] <=== Це приходить на
email

Маршрути Категорій: src/routes/api/categories.js [GET] Всі категорії = [
http://localhost:8081/api/categories?year=2022&month=10 ] { Authorization =
Bearer token }

Маршрути Транзакцій: src/routes/api/transactions.js [POST] Створити транзакцію =
[ http://localhost:8081/api/transactions/ ] { "date": "2022-10-02",
"transactionType": "spend", "category": "irregular income", "sum": 3000,
"comment": "comment", "balance": 1111 } { Authorization = Bearer token } Всі
поля обов`язкові.

[GET] Получити всі транзакції = [ http://localhost:8081/api/transactions/ ] {
Authorization = Bearer token }

[GET] Получити одну транзакцію по ID = [
http://localhost:8081/api/transactions/:transactionId ] { Authorization = Bearer
token }

[DELETE] Видалити транзакцію по ID = [
http://localhost:8081/api/transactions/:transactionId ] { Authorization = Bearer
token }

[PUT] Оновити транзакцію по ID = [
http://localhost:8081/api/transactions/:transactionId ] { "date": "2022-10-20",
"transactionType": "income", "category": "regular income", "sum": 14, "comment":
"comment", "balance": 123456 } { Authorization = Bearer token }
===============================================================

Notes: Можна добавити життя токену коли ви працюєте: У файлі
src/models/userSchema.js на рядку 75 замінити { expiresIn: '1h' } на {
expiresIn: '12h' } токен буде жити 12годин. У прикладах під раутами показано те
що потрібно відправляти при запиті. { Authorization = Bearer token } - це
означає потрібен токен у заголовках. Токен живе 1 годину. На скриньку буде
приходити лист із верифікацією. Обмеження 100 листів на всіх на 24 години.
Стартує на порті 8081. На swager і heroku ще робиться. Якщо все буде добре, то
можливо вийде google-auth добавити.
