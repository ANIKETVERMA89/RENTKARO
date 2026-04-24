/* ADD VEHICLE (PROVIDER FORM) - Updated to include all required NOT-NULL columns */

app.post("/add-vehicle", async (req,res)=>{

 try{

  const data = req.body;

  const { error } = await supabase

   .from("vehicles")

   .insert([{

    /* ---- Original NOT-NULL columns that must be populated ---- */
    name: data.brand + " " + data.name,     /* e.g. "Tesla Model S" */
    type: data.type,                         /* car / bike / scooty  */
    price: data.price,                       /* same as daily_rate   */
    provider_email: data.providerEmail || "",/* provider's email      */

    /* ---- New detailed columns ---- */
    vehicle_type: data.type,
    brand: data.brand,
    model: data.name,
    variant: data.subType,
    manufacture_year: data.specs?.year,
    daily_rate: data.price,
    hourly_rate: data.hourlyPrice,
    location: data.location,
    fuel_type: data.specs?.fuel,
    transmission: data.specs?.transmission,
    seats: data.specs?.seats,
    mileage: data.specs?.mileage,
    km_driven: data.specs?.km,
    features: data.features,
    image_url: data.image,
    gallery_images: data.images

   }]);


  if(error){

   console.log(error);

   return res.status(500).json({

    success:false,

    message:"vehicle not added"

   });

  }

  res.json({

   success:true

  });

 }

 catch(err){

  console.log(err);

  res.status(500).json({

   success:false

  });

 }

});
