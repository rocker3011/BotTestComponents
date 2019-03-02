
module.exports = {
  dependencies:{
    axios: require('axios')
  },
  metadata: () => ({
    name: 'shipmentCheck',
    properties: {
      result: {required: true}
    },
    supportedActions: ['CheckStatus','SaveShipment']
  }),
  invoke: (conversation, done) => { 
    // perform conversation tasks.
    const { result } = conversation.properties();
    var url = "https://atapi2.postnord.com/rest/shipment/v1/trackandtrace/findByIdentifier.json";
    var qs = {
      apikey : "cddff37cf9658abe14ca302499a828cd",
      id : result,
      locale: "en"
    }
    module.exports.dependencies.axios.get(url+'?'+'apikey='+qs.apikey+'&id='+qs.id+'&locale='+qs.locale)
    .then((res)=>{
        //conversation.reply(`${res.data.TrackingInformationResponse.shipments.items.length}`)
        if(res.data.TrackingInformationResponse.shipments.length>0){
          var division = res.data.TrackingInformationResponse.shipments[0].items[0].dropOffDate.split('T');
          var date = division[0];
          var time = division[1];
          conversation.variable("shipmentInfo",`Your package will be delivered on ${date} around ${time}`);

          conversation
          .reply(`Your package will be delivered on ${date} around ${time}`)
          .reply(`What else do you need today?`)
          .transition('SaveShipment');
        }else{
          conversation
          .reply(`You entered a wrong ID`)
          .reply(`What else do you need today?`)
          .transition('CheckStatus');
        }

      done();
    })
  }
}; 