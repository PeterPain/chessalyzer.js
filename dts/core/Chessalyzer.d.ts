/** Main class for batch processing and generating heat maps */
export default class Chessalyzer {
    /**
     * Starts the singlethreaded batch processing for the selected file
     * @param {string} path - Path to the PGN file that should be analyzed
     * @param {(Object|Object[])} analyzer - The analysis functions that shall be run
     *  during batch processing. Can be one single analyzer or an array of analyzers.
     * @param {Object} [cfg = {}]
     * @param {Function} [cfg.filter = ()=>true] - Filter function for selecting games
     * @param {number} [cfg.cntGames = Infinite ] - Max amount of games to process
     * @param {Object} callback - Callback object
     * @param {Function} [callback.fun] - Callback function that is called every callback.rate games
     * @param {number} [callback.rate] - Every 'rate' games the callback function is called.
     * @returns {Promise}
     */
    static startBatch(path: string, analyzer: (any | any[]), cfg?: {
        filter: Function;
        cntGames: number;
    }, callback?: {
        fun: Function;
        rate: number;
    }): Promise<any>;
    /**
     * Starts the multithreaded batch processing for the selected file
     * @param {string} path - Path to the PGN file that should be analyzed
     * @param {(Object|Object[])} analyzer - The analysis functions that shall be run
     *  during batch processing. Can be one single analyzer or an array of analyzers.
     * @param {Function} [cfg.filter = ()=>true] - Filter function for selecting games
     * @param {number} [cfg.cntGames = Infinite ] - Max amount of games to process
     * @param {number} [batchSize = 8000] Amount of games per thread.
     * @param {number} [nThreads = 1] numbers of additional threads to use.
     * @returns {Promise}
     */
    static startBatchMultiCore(path: string, analyzer: (any | any[]), cfg?: {}, batchSize?: number, nThreads?: number): Promise<any>;
    /**
     * Saves a completed batch run to a JSON file
     * @param {string} path - Path the data file shall be saved to
     * @param {Object} data - The data that shall be saved
     */
    static saveData(path: string, data: any): void;
    /**
     * Loads the stats of a previous batch run (JSON) to a data bank
     * @param {string} path - Path the data file shall be loaded from
     * @returns {Object} Returns the loaded data
     */
    static loadData(path: string): any;
    /**
     * Generates a heatmap out of the tracked data.
     * @param {Object} data - Where the data shall be taken from
     * @param {(string|number[])} square - The square the data shall be generated for.
     * For example, if you wanted to know how often a specific piece was on a specific tile,
     * you would pass the identifier of the tile to the function, e.g. "a2" or [7,1].
     * @param {Function} fun - The evaluation function that generates the heatmap out of the
     * data.
     * See ./src/exampleHeatmapConfig for examples of such a function.
     * @param {*} [optData = {}] - Optional data you may need in your eval function
     * @returns {Object} Array with 3 entries:
     * <ol>
     * <li>map: 8x8 Array containing the heat map values for each tile</li>
     * <li>min: The minimum value in the heatmap.</li>
     * <li>max: The maximum value in the heatmap.</li>
     * </ol>
     */
    static generateHeatmap(data: any, square: (string | number[]), fun: Function, optData?: any): any;
    /**
     * Generates a comparison heatmap out of the tracked data. There needs to data in both
     * banks you pass as bank1 and bank2 params. The heatmap for both banks is calculated
     * and then the relative differences between both banks are calculated. For example,
     * if the heatmap value for "a1" of bank1 is 10 and the value of bank2 is 5, the returned
     * value for "a1" would be 100% ([[10/5] -1] *100).
     * @param {Object} data1 - Dataset 1
     * @param {Object} data2 - Dataset 2
     * @param {(string|number[])} square - The square the data shall be generated for. Notation
     * can be 'a1' or [7,0].
     * @param {Function} fun - The evaluation function that generates the heatmap out of the
     * saved data. See {@link generateHeatmap} for a more detailed description.
     * @param {*} [optData = {}] - Optional data you may need in your eval function
     * @returns {Object} Object with 3 entries:
     * <ol>
     * <li>map: 8x8 Array containing the heat map values for each tile</li>
     * <li>min: The minimum value in the heatmap.</li>
     * <li>max: The maximum value in the heatmap.</li>
     * </ol>
     */
    static generateComparisonHeatmap(data1: any, data2: any, square: (string | number[]), fun: Function, optData?: any): any;
    /**
     * Prints a heatmap to the terminal
     * @param {number[][]} map - The heatmap data. An (8x8) Array containing values.
     * @param {number} min - The minimum value in map.
     * @param {number} max - The maximum value in map.
     */
    static printHeatmap(map: number[][], min: number, max: number): void;
    static getStartingPiece(sqr: any): {
        color: string;
        name: string;
    };
}
