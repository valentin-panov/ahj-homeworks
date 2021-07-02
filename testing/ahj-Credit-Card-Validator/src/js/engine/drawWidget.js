export default function drawWidget() {
  const element = document.createElement('div');
  element.classList.add('wrapper');
  element.innerHTML = `
  <div class="container">
    <h1 class="title">CARD VALIDATOR</h1>
    
    <h3>Check your credit card number</h3>
      <ul class="cards list-unstyled">
        <li><span class="card visa" title="Visa">Visa</span></li>
        <li><span class="card master" title="Mastercard">Mastercard</span></li>
        <li><span class="card mir" title="MIR">MIR</span></li>
        <li><span class="card amex" title="American Express">American Express</span></li>
        <li><span class="card discover" title="Discover">Discover</span></li>
        <li><span class="card jcb" title="JCB">JCB</span></li>
        <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
      </ul>

      <div class="alert-box success visually-hidden">Valid card number</div>
      <div class="alert-box failure visually-hidden">Invalid card number</div>

      <form id="input-card-form" class="form-inline" novalidate="novalidate">
        <div class="form-group">
          <input class="form-control" id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
          <a id="submitform" class="btn btn-success">Click to Validate</a>
        </div>
      </form>

  </div>`;

  document.body.append(element);
}
