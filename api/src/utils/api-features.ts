export class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): APIFeatures {
    const queryObj: any = { ...this.queryString };
    const excludedFields: string[] = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el: string) => delete queryObj[el]);

    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`);

    if (!this.queryString?.preset) this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort(): APIFeatures {
    if (this.queryString?.sort) {
      const sortBy: string = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): APIFeatures {
    if (this.queryString?.fields) {
      const fields: string = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate(): APIFeatures {
    const page: number = this.queryString.page * 1 || 0;
    const limit: number = this.queryString.limit * 1 || 100;
    const skip: number = page * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search(): APIFeatures {
    if (this.queryString?.search) {
      console.log(this.queryString.search);
      const searchBy: string = this.queryString.search.split(',').join(' ');
      console.log(searchBy);
      this.query = this.query?.searchDocument(searchBy.toString());
    }

    return this;
  }

  count(): APIFeatures {
    this.query = this.query.countDocuments();
    return this;
  }
}
