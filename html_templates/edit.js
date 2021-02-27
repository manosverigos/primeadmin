exports.editOffer = (offer) => {

  return `<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Επεξεργασία προσφοράς</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <style type="text/css">
      .nav {
        padding: 30px;
      
      }
      
      .add-offer {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      
      .btn-complete {
        width: 25%;
        margin: auto;
      }
      
      .nav-item {
        display: flex;
        align-items: center;
      }
      
      .home {
        font-size: x-large;
      }
      
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .offer_card {
        width: 75%;
        margin: 25px auto;
      }
      
      .card-header {
        font-size: x-large;
      }
      
      .form-label {
        margin-top: 15px
      }
      
      .btn-primary {
        margin-top: 15px;
      }
      
      
      .btn-add-offer {
        margin-right: 75px;
        margin-top: 0;
      }
      
      #offer-card {
        width: 75%;
        margin: 0 auto;
      }
      
      .row-cacl {
        margin: 10px;
      }
      
      .container-cacl{
        width: 50%
      }
      
      .btn-cacl{
        margin: 15px;
      }
      
      .buttons{
        display: flex;
        justify-content: center;
      }
      
      .result{
        display: flex;
        justify-content: center;
      }
      
      .filter {
        width: 100px;
        margin-left: 75px
      }
      
      .filter-form{
        width:70%
      }
      
      .f-grey{
        color: rgb(116, 116, 116);
      }
      
      .card-info{
        margin:10px
      }
      
      .main{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .message{
        margin-top: 20%;
        width: 50%;
        font-size: 40px;
        text-align: center;
      }
      
      .login-title .login-form{
        display: block;
      }
      
      .login-title{
        text-align: center;
      }
      
      .login-form-actual{
        width: 50%;
        margin: 0 auto;
      }

      .mobile-nav{
        display: none;
      }

      @media only screen and (max-width: 600px) {
        .mobile-nav{
          display: block
        }
      
        .desktop-nav{
          display: none
        }
        
        .message {
          width: 80%
        }
      
        .filter{
          margin-left: 10px;
        }
      
        .filter-form{
          width: 100%;
        }
        
        .btn-add-offer {
          margin-right: 10px;
        }
      
        .card-info{
          margin: 10px 0 ;
        }
      
        .col-6 {
          padding: 5
        }
      
        .btn-complete{
          width: 70%;
          margin: 5px;
        }
        .offer-complete{
          position: relative;
          left: -77px;
        }
      
        .offer_card{
          width: 90%;
        }

        body, html {
          overflow-x: hidden;
        }
      }
      </style>
    <script>
  
      validateForm = () =>{
        const form = document.getElementById('offer')
        form.className='was-validated'
      }

      setType = () => {
        if('${offer.type}' == 'time') {
          console.log('time')
          document.getElementById('selected_type').textContent = 'Βάσει χρόνου'
        } else if ('${offer.type}' == 'sales'){
          document.getElementById('selected_type').textContent = 'Βάσει πωλήσεων'
        }
      }

      displayInput = () => {
        const type_container = document.getElementById('type')
        type_container.innerHTML = ''
        
        if ('${offer.type}' == 'time') {
          
          console.log('time')
          let today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          const yyyy = today.getFullYear();
          today = yyyy + '-' + mm + '-' + dd;
  
          const label = document.createElement('label')
          label.setAttribute("for", 'end_date')
          label.className = 'form-label'
          const text = document.createTextNode('Ημερομηνία λήξης')
          label.appendChild(text)
          type_container.appendChild(label)
  
          const input = document.createElement('input')
          input.id = 'endDate'
          input.setAttribute("name", "endDate")
          input.setAttribute("type", "date")
          input.setAttribute("value",'${offer.endDate}')
          input.className = 'form-control'
          input.required = true;
          type_container.appendChild(input)
  
          const product = document.getElementById('product')
          product.setAttribute("type", "text")
          product.setAttribute("value", '${offer.product}')
  
        } else if (val = 'sales') {
          console.log('sales')
          const label = document.createElement('label')
          label.setAttribute("for", 'sales_num')
          label.className = 'form-label'
          const text = document.createTextNode('Αριθμός πωλήσεων')
          label.appendChild(text)
          type_container.appendChild(label)
  
          const input = document.createElement('input')
          input.id = 'sales_num'
          input.setAttribute("name", "sales_num")
          input.setAttribute("type", "number")
          input.setAttribute("value", '${offer.sales_num}')
          input.className = 'form-control'
          input.required = true;
          type_container.appendChild(input)
  
          const product = document.getElementById('product')
          product.setAttribute("type", "number")
          product.setAttribute("value", '${offer.product}')
        }
      }
    </script>
  </head>
  
  <body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mobile-nav">
    <div class="container-fluid">
      <a class="navbar-brand" href="../../index.html">Prime Admin Page</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../../offers/index.html">Προσφορές</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής
            </a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="../../message.html">Μηνύματα
          </a>
          </li>
          </ul>
      </div>
    </div>
  </nav>
    <ul class="nav nav-pills nav-fill shadow p-3 mb-5 bg-body rounded desktop-nav">
      <li class="nav-item">
        <a class="nav-link home" href="../../index.html" tabindex="-1" aria-disabled="true">Prime Admin Page</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="../../offers/index.html">Προσφορές</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="./message.html">Μηνύματα
      </a>
      </li>
    </ul>
    <div class='title'>
      <h5 class="card-title">Επεξεργασία προσφοράς</h5>
    </div>
    <div id="offer-card" class="shadow-sm p-3 mb-5 bg-body rounded">
      <form action="/api/offers/edit" id='offer' method='POST'>
        <label for='_id' class="form-label">ID</label>
        <input id="disabledTextInput" name='_id' type="text" class="form-control" value = '${offer._id}' readonly="readonly">

        <label for='title' class="form-label">Τίτλος</label>
        <input id='title' name='title' type="text" placeholder="Τίτλος" class="form-control" value = '${offer.title}' required>
  
        <label for='based_on' class="form-label">Τύπος</label>
        <select id='based_on' name='type' aria-label="Disabled select example" disabled class="form-control">
          <option id='selected_type' value= '${offer.type}' disabled selected>
          </option>
        </select>
  
        <label for="product" class="form-label">Προϊόν / Εταιρία</label>
        <input id='product' name='product' type="text" placeholder='Προϊόν / Εταιρία' class="form-control" value = '${offer.product}'required>
  
        <div id="type"></div>
  
        <label for="comment" class="form-label">Ολοκλήρωση</label>
        <textarea id='comment' rows='4' cols='50' name='comment' type="text" class="form-control" required>${offer.comment}</textarea>
        <input type="submit" class="btn btn-primary" value='Επιβεβαίωση' onclick="validateForm()">
      </form>
    </div>
    <script>
      displayInput()
      setType()
      console.log('ok')
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
    </script>
  </body>
  
  </html>`
}