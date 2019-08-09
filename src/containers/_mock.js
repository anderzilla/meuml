export default {
  data: {
    external_data: {
      name: '',
      points: 1047,
      seller_experience: "ADVANCED",
      seller_reputation: {
        level_id: "5_green",
        metrics: {
          cancellations: { period: "60 months", rate: 0.025 },
          claims: { period: "60 months", rate: 0.0192 },
          delayed_handling_time: { period: "60 months", rate: 0.0707 },
          sales: { completed: 1512, period: "60 months" }
        },
        power_seller_status: null,
        transactions: {
          canceled: 47,
          completed: 1512,
          period: "historic",
          ratings: { negative: 0, neutral: 0.01, positive: 0.99 },
          total: 1559
        }
      }
    }
  }
};

// export default {
//   "data": {
//     "count_advertisings": 0,
//     "count_orders": 0,
//     "external_data": {
//       "points": 0,
//       "seller_experience": "NEWBIE",
//       "seller_reputation": {
//         "level_id": "5_green",
//         "metrics": {
//           "cancellations": {
//             "period": "60 months",
//             "rate": 0
//           },
//           "claims": {
//             "period": "60 months",
//             "rate": 0
//           },
//           "delayed_handling_time": {
//             "period": "60 months",
//             "rate": 0
//           },
//           "sales": {
//             "completed": 0,
//             "period": "60 months"
//           }
//         },
//         "power_seller_status": null,
//         "transactions": {
//           "canceled": 0,
//           "completed": 0,
//           "period": "historic",
//           "ratings": {
//             "negative": 0,
//             "neutral": 0,
//             "positive": 0
//           },
//           "total": 0
//         }
//       },
//     },
//     "external_id": "000",
//     "external_name": "_mock",
//     "id": 0,
//     "name": "Selecione uma conta",
//     "seller": {
//       "date_created": "2019-07-10T21:33:16.097709+00:00",
//       "id": 0
//     }
//   }
// }