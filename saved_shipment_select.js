
module.exports = {
    metadata: () => ({
      name: 'savedShipmentSelect',
      properties: {
        shipmentinfo: {required: true},
        ship: {required:true}
      },
      supportedActions: []
    }),
    invoke: (conversation, done) => { 
      // perform conversation tasks.
      const { shipmentinfo } = conversation.properties();
      const { ship } = conversation.properties();
        if (ship === ""){
            conversation.variable("shipments",`${shipmentinfo}`);
        }else{
            conversation.variable("shipments",`${ship},${shipmentinfo}`);
        }
        conversation
        .reply(`info has been saved!`)
        .transition();

  
        done();
    }
  }; 