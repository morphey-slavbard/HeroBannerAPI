const router = require('express').Router();
const products = require('../models/product');
const DYAPI = require('../DYAPI.JS');



router.get('/', async (req, res) => {
  const { heroBanner, recommendations, overlay } = await getPageContent(req);
  res.render('homepage', {
    overlay,
    heroBanner,
    recommendations,
    invertedHeader: true,
  });
});

const defaultHeroBanner = {
  image: 'https://www.frasers.com/images/marketing/co/23-24/wk28/frasers-lux-hero-xmas-d.jpg',
  title: 'TIME TO PARTY.',
  subtitle: 'SHOP PARTYWEAR',
  cta: 'SHOW NOW',
  link: '/category/all',
};

const defaultRecommendations = products.getRandom(4);

const defaultOverlay = {
  image: 'http://cdn.dynamicyield.com/petshop/images/erda-estremera-581452-unsplash.png',
  title: 'Invest in your pet',
  content: 'Subscribe to our monthly treat box<br>and receive the items you love for a<br>great price, plus seasonal surprises',
  cta: 'Start Here',
  link: '/category/all',
};


async function getPageContent(req) {
  // Complete the context with the appropriate page type, and call the API
  req.dyContext.page.type = 'HOMEPAGE';
  const apiResponse = await DYAPI.choose(req.userId, req.sessionId, req.dyContext, ['HP Hero Banner']);
console.log(apiResponse[0].variations[0].payload.data);
  
  if (Array.isArray(apiResponse.variations) && apiResponse.variations.length > 0) {
    console.log('consolelog if');
    console.log(apiResponse.variations[0]?.payload?.data);
  } else {
    console.log('Darren No variations found or variations array is empty.');
  }
  

  // Rest of function remains as is, for now
  let content = {
    recommendations: defaultRecommendations,
    
  };
  if (apiResponse[0].variations[0].payload.data.featureFlag === "TRUE") {content.heroBanner = apiResponse[0].variations[0].payload.data}
  else {content.heroBanner = defaultHeroBanner}
  
  
  if (req.originalUrl.includes('SALE')) {
    content.overlay = defaultOverlay;
  }
  return content;
}


module.exports = router;
