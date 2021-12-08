import * as express from 'express';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as cors from 'cors';

const app = express();

app.use(cors());

export interface Films{
  id: number;
  name: string;
  genre1: string;
  genre2: string;
  year: string;
}

let arr: Films[] = [];

app.listen(4201, () => {
  console.log('hi');
});

fs.createReadStream('backend/data.csv')
  .pipe(csv())
  // tslint:disable-next-line:only-arrow-functions typedef
  .on('data', function(data){
    try {
      arr.push({
        id: parseInt(data.id, 10),
        name: data.name,
        genre1: data.genre1,
        genre2: data.genre2,
        year: data.year
      });
    }
    catch (err) {
    }
  })
  // tslint:disable-next-line:only-arrow-functions typedef
  .on('end', function(){
    console.log(arr.length / 40);
  });



app.route('/api/films/:pageNumber').get( (req, res) => {
  const pageNumber: number = req.params.pageNumber;

  const toStartWith = ((arr.length / 40) * pageNumber );
  const toEndWith = (toStartWith + arr.length / 40 ) - 1;
  const films = arr.filter( el => el.id >= toStartWith && el.id <= toEndWith );
  res.send({
    films,
    length: arr.length / 25
  });
});

app.route('/api/film/:id').get( (req, res) => {
  const id: number = req.params.id;
  const films = arr.filter( el => el.id == id);
  res.send(films);
});

app.route('/api/films/sort/:order/filter/:filter').get( (req, res) => {
  let aSort = '';
  let bSort = '';
  const order: string = req.params.order;
  const filter: string = req.params.filter;
  const films = arr.filter( el => el.genre1 === filter || el.genre2 === filter).sort( (a, b) => {
    switch (order) {
      case 'Name' :
        aSort = a.name;
        bSort = b.name;
        break;
      case 'Year' :
        aSort = a.year;
        bSort = b.year;
        break;
    }
    if (aSort > bSort) {
      return 1;
    }
    if (aSort < bSort) {
      return -1;
    }
    return 0;
  });
  res.send({
    films,
    length: arr.length / 25
  });
});
