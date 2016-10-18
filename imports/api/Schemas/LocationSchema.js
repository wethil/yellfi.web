export default LocationSchema = new SimpleSchema({
    "type":{
        type: String,
        allowedValues: ["MultiPoint"]
    },
    "coordinates":{
        type: Array,
        minCount: 1,
        maxCount: 2
    },
    "coordinates.$":{
        type: Array,
        minCount: 1,
        maxCount: 2
    },
    "coordinates.$.$" :{
        type:Number,
        decimal:true,
        custom: function(){
            if(!(-90 <= this.value[0] <= 90))
             return "latOutOfRange" ;
            if(!(-180 <= this.value[1] <= 180))
             return "lonOutOfRange" ;
        }

    },
    "ipLocAdress": {
        type: String,
        optional: true
    },
    "geoLocAdress": {
        type: String,
        optional: true
    },
});

LocationSchema.messages = {
  lonOutOfRange: 'Longitude out of range', // Must be between -90 and 90
  latOutOfRange: 'Latitude out of range' // Must be between -180 and 180
}

