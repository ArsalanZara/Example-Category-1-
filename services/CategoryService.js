const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing feedback data
 */
class CategoryService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the feedback data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get all feedback items
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new feedback item
   * @param {*} name The name of the user
   * @param {*} title The title of the feedback message
   * @param {*} message The feedback message
   */
  async addEntry(category) {
    const data = (await this.getData()) || [];
    data.unshift(category);
    return writeFile(this.datafile, JSON.stringify(data));
  }

  //sets the categories the a new list
  async setList(categories) {
    return writeFile(this.datafile, JSON.stringify(categories));
  }

  /**
   * Fetches feedback data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = CategoryService;
