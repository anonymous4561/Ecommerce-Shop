const KEY =process.env.STRIPE_KEY;
const stripe = require("stripe")("sk_test_51LWOf1SEF6QGPIPI0JnpCJxJQusytR1Ak9QRpiJMLCX5B5dtcvWYy72nE7IF9mEWePFkONKO829WKoT0PXP0aGJM00xddDpcuN");
const router = require("express").Router();




router.post("/payment",async (req,res)=>{
  const {email,amount,tokenId,card} =req.body;
  const customer = await stripe.customers.create({
    email: email,
    source: tokenId,
  });
       await stripe.paymentIntents.create({
    amount: amount,
     payment_method_types: ['card'],
     currency: 'INR',
     customer: customer.id,
     receipt_email:email,
     shipping:{
      name:card.name,
      address:{
        city:card.address_city,
        country:card.address_country,
        line1:card.address_line1,
        line2:card.address_line2,
        postal_code:card.address_zip,
    
      },
     },

    

     
  },
(stripeErr,stripeRes)=>{
  if(stripeErr){
      res.status(500).json(stripeErr);
 }else{
    res.status(200).json(stripeRes);
}
});
});

module.exports = router;