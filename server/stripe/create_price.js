const stripe = require('stripe')('sk_test_51NfFraEGcRue3GUHGLciaxjkkeAO6f8lY3R4mz58OGWRrCJtpj5erqt91m4NRH5P3CnI6WmeccwEMS2i1EBAIbZl00IQW4pMgl');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});