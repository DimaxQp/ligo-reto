function fn() {
  var env = java.lang.System.getenv;
  karate.configure('connectTimeout', 15000);
  karate.configure('readTimeout', 20000);
  karate.configure('headers', { Accept: 'application/json', 'Content-Type': 'application/json' });
  return {
    baseUrl: karate.properties['baseUrl'] || env('API_BASE_URL') || 'https://restful-booker.herokuapp.com',
    username: env('BOOKER_USERNAME') || 'admin',
    password: env('BOOKER_PASSWORD') || 'password123',
    newBooking: function(price, paid) {
      return {
        firstname: 'QA-' + java.util.UUID.randomUUID(), lastname: 'Automation',
        totalprice: price, depositpaid: paid,
        bookingdates: { checkin: '2027-01-10', checkout: '2027-01-12' },
        additionalneeds: 'Breakfast'
      };
    }
  };
}
