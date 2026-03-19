export const pesticidesDefaultConfig = {
  categories: [
    {
      key: 'insect',
      title: 'Insecticides',
      desc: 'Fast and targeted control for sucking and chewing pests.',
      products: ['AgroShield Pro', 'BioGuard Plus', 'LeafProtect Max'],
    },
    {
      key: 'fungi',
      title: 'Fungicides',
      desc: 'Protective and curative programs against major crop diseases.',
      products: ['FungiStop Elite', 'CropCure Advanced', 'PowerShield Duo'],
    },
    {
      key: 'herb',
      title: 'Herbicides',
      desc: 'Selective and broad-spectrum weed suppression options.',
      products: ['WeedOut Total', 'SelectiveGreen', 'PreBlock Pro'],
    },
  ],
  planner: {
    insect: {
      title: 'Insect Attack Control Plan',
      description: 'Fast knockdown plus follow-up control to break pest cycles.',
      points: [
        'Scout weekly and spray at threshold levels.',
        'Rotate chemistry classes to reduce resistance.',
        'Prioritize under-leaf coverage for effective control.',
      ],
      dose: 'Planner Rate: 80-250 ml per acre depending on formulation.',
    },
    fungi: {
      title: 'Disease Pressure Management Plan',
      description: 'Preventive and curative fungicide timing for critical stages.',
      points: [
        'Start protective sprays before visible disease in humid periods.',
        'Use systemic options at early symptom appearance.',
        'Maintain interval discipline through flowering and fruiting.',
      ],
      dose: 'Planner Rate: 120-500 g/ml per acre based on disease severity.',
    },
    herb: {
      title: 'Weed Suppression Plan',
      description: 'Pre- and post-emergence strategy to protect crop competition.',
      points: [
        'Apply pre-emergence on moist soil for early weed check.',
        'Use selective herbicides for crop-safe control.',
        'Plan a follow-up for late flushes in wide-row crops.',
      ],
      dose: 'Planner Rate: 350-1000 ml per acre based on weed spectrum.',
    },
  },
}

export const fertilizersDefaultConfig = {
  blocks: [
    {
      title: 'NPK Fertilizers',
      items: ['GrowMax 20-20-20', 'YieldBoost 15-15-15', 'FlowerPro 12-61-00'],
    },
    {
      title: 'Organic Fertilizers',
      items: ['BioGrow Organic', 'GreenSoil Plus', 'Compost Pro Blend'],
    },
    {
      title: 'Micronutrients',
      items: ['Zinc+ Chelate', 'Iron Rescue', 'Trace Mix Gold'],
    },
    {
      title: 'Specialty Fertilizers',
      items: ['Calcium Guard', 'Fruit Fill K+', 'Humic Active'],
    },
  ],
  planner: {
    npk: {
      title: 'NPK Crop Strategy',
      description: 'Balanced NPK scheduling for full-season growth support.',
      points: [
        'High phosphorus at establishment for stronger roots.',
        'Balanced NPK during vegetative canopy development.',
        'Higher potassium near fruit/grain formation for quality.',
      ],
      dose: 'Planner Dose: 2-3 kg per acre through split applications.',
    },
    organic: {
      title: 'Organic Soil Building Plan',
      description: 'Sustained soil fertility with stronger microbial activity.',
      points: [
        'Pre-sowing compost-rich input to improve structure.',
        'Vermi-based support in active growth periods.',
        'Neem-based integration for nutrition and soil defense.',
      ],
      dose: 'Planner Dose: 150-300 kg per acre by organic matter level.',
    },
    micro: {
      title: 'Micronutrient Correction Program',
      description: 'Fast correction of hidden deficiencies affecting yield quality.',
      points: [
        'Start zinc correction in early growth windows.',
        'Use chelated iron where chlorosis risk is high.',
        'Apply trace mix before flowering for better set.',
      ],
      dose: 'Planner Dose: 1-2 kg per acre foliar/fertigation.',
    },
    special: {
      title: 'Specialty Performance Program',
      description: 'Targeted nutrition for premium quality and stress resilience.',
      points: [
        'Calcium-focused schedule for firmness and shelf life.',
        'Magnesium support at peak growth demand.',
        'Humic integration to improve nutrient use efficiency.',
      ],
      dose: 'Planner Dose: Product-specific stage schedule.',
    },
  },
}

export const cropSolutionsDefaultConfig = {
  monthSeasonMap: {
    1: 'winter',
    2: 'winter',
    3: 'spring',
    4: 'spring',
    5: 'summer',
    6: 'summer',
    7: 'monsoon',
    8: 'monsoon',
    9: 'monsoon',
    10: 'autumn',
    11: 'autumn',
    12: 'winter',
  },
  seasonalUpdates: {
    winter: {
      title: 'Winter Yield Booster Window',
      description: 'Cool-weather nutrient balancing and disease prevention for stable yield build-up.',
      focus: ['Rabi crop nutrition correction', 'Rust/blight preventive schedule', 'Moisture-aware spray intervals'],
      recommendation: 'Apply balanced feed with sulfur and monitor fungal pressure every 7-10 days.',
      priorityCategories: ['fungicide', 'micronutrient', 'npk'],
    },
    spring: {
      title: 'Spring Growth Acceleration',
      description: 'Rapid vegetative growth stage where canopy expansion and micronutrients are critical.',
      focus: ['Micronutrient correction', 'Insect scouting', 'Canopy vigor improvement'],
      recommendation: 'Introduce zinc/boron support and stage-wise insect control before flowering peaks.',
      priorityCategories: ['micronutrient', 'insecticide', 'organic'],
    },
    summer: {
      title: 'Summer Stress Control Mode',
      description: 'High temperature and evapotranspiration season needing resilience planning.',
      focus: ['Heat stress nutrition', 'Water-use efficiency', 'Pest flare-up prevention'],
      recommendation: 'Use potassium-rich and anti-stress blends with early-morning spray strategy.',
      priorityCategories: ['specialty', 'potash', 'insecticide'],
    },
    monsoon: {
      title: 'Monsoon Protection Priority',
      description: 'Humidity-driven disease and weed pressure management for crop protection.',
      focus: ['Fungal disease shield', 'Weed pressure suppression', 'Drainage and root health'],
      recommendation: 'Increase preventive fungicide interval discipline and root-zone protective nutrition.',
      priorityCategories: ['fungicide', 'herbicide', 'organic'],
    },
    autumn: {
      title: 'Autumn Transition Planning',
      description: 'Field reset and pre-sowing preparation window for next seasonal cycle.',
      focus: ['Soil conditioning', 'Residue management', 'Pre-season program setup'],
      recommendation: 'Finalize seed and soil preparation with baseline nutrient map for next cycle.',
      priorityCategories: ['organic', 'npk', 'herbicide'],
    },
  },
  crops: [
    { key: 'vegetables', label: 'Vegetables', subtitle: 'Potato, tomato, onion, chili' },
    { key: 'fruits', label: 'Fruits', subtitle: 'Mango, citrus, grapes, banana' },
    { key: 'cereals', label: 'Cereals', subtitle: 'Wheat, rice, maize, barley' },
    { key: 'cash', label: 'Cash Crops', subtitle: 'Cotton, sugarcane, tobacco' },
  ],
  programs: {
    vegetables: {
      title: 'Vegetables Program',
      subtitle: 'Customized crop health and growth solutions.',
      stages: [
        { title: 'Stage 1: Seedling & Transplanting', feed: 'NPK 10-52-10 + Zn for root growth', protect: 'Fungicide for transplant shock and soil diseases' },
        { title: 'Stage 2: Vegetative Growth', feed: 'Nitrate + Calcium for canopy development', protect: 'Insecticide for aphids and borers' },
        { title: 'Stage 3: Flowering & Fruiting', feed: 'NPK 12-12-36 + micros for set and fill', protect: 'Fungicide + insecticide rotation by pressure' },
        { title: 'Stage 4: Harvesting', feed: 'Potassium booster for quality and shelf life', protect: 'Safe pre-harvest interval spray plan' },
      ],
    },
    fruits: {
      title: 'Fruits Program',
      subtitle: 'Balanced nutrition and protection for premium fruit quality.',
      stages: [
        { title: 'Stage 1: Bud Break', feed: 'NPK 20-20-20 + Mg for flush uniformity', protect: 'Preventive spray against leaf spot and insects' },
        { title: 'Stage 2: Pre-Flowering', feed: 'High phosphorus + boron for flower initiation', protect: 'Thrips and mite management' },
        { title: 'Stage 3: Fruit Development', feed: 'Calcium + potassium for size and firmness', protect: 'Fruit fly and rot control strategy' },
        { title: 'Stage 4: Maturity', feed: 'Quality enhancer + trace mix for color/sweetness', protect: 'Residue-aware protection schedule' },
      ],
    },
    cereals: {
      title: 'Cereals Program',
      subtitle: 'Step-wise nutrition and protection for stronger grain filling.',
      stages: [
        { title: 'Stage 1: Sowing', feed: 'DAP + starter zinc for root establishment', protect: 'Seed treatment against soil-borne disease' },
        { title: 'Stage 2: Tillering', feed: 'Split nitrogen for tiller formation', protect: 'Targeted control of leaf-eating pests' },
        { title: 'Stage 3: Booting', feed: 'NPK 10-10-40 + sulfur for set', protect: 'Fungicide against rust and blight' },
        { title: 'Stage 4: Grain Fill', feed: 'Potassium-rich finishing feed', protect: 'Final disease and pest watch plan' },
      ],
    },
    cash: {
      title: 'Cash Crops Program',
      subtitle: 'High-response crop strategy for better market returns.',
      stages: [
        { title: 'Stage 1: Establishment', feed: 'Starter NPK + zinc for stand vigor', protect: 'Early preventive treatment for sucking pests' },
        { title: 'Stage 2: Vegetative', feed: 'Nitrogen + calcium framework support', protect: 'Integrated whitefly and mealybug management' },
        { title: 'Stage 3: Reproductive', feed: 'Potassium + micros for boll/cane development', protect: 'Rotation strategy by field pressure' },
        { title: 'Stage 4: Pre-Harvest', feed: 'Finishing nutrition for quality and weight', protect: 'Safe quality-protection schedule' },
      ],
    },
  },
}
