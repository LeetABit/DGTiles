declare module 'git-attributes' {
    export type Rule = {
        pattern: string,
        attrs: {},
        comment: string | null,
    }
    class GitAttributes {
        constructor();
        /**
         * Rules
         * @returns {GitAttributes.Rule[]}
         */
        get rules(): Rule[];

        /** @param {GitAttributes.Rule[]} rules */
        set rules(rules: Rule[]);

        /**
         * Clears all rules.
         */
        clear();

        /**
         * Add a rule
         * @param {GitAttributes.Rule} rule
         */
        addRule(rule: Rule);

        /**
         * Add a set of rules
         * @param {GitAttributes.Rule[]} rules
         */
        addRules(rules: Rule[]);

        /**
         * Parse the `.gitattributes` file of a specific repo.
         * @remarks Parsing does not clear previously parsed rules. This is to allow parsing global + local files etc.
         * @param {String} path - path to the repo
         * @param {Boolean} [includeComments=false] - return a rule even for a comment (will have `pattern=null`)
         * @param {Boolean} [includeEmptyLines=false] - return an empty rule for empty lines
         * @returns {Boolean} `true` if succeeded, `false` if a `.gitattributes` file could not be found
         */
        parseAttributesForRepo(path: string, includeComments?: boolean, includeEmptyLines?: boolean): boolean;

        /**
         * Serialize the rules into a `.gitattributes` file in a specific repo.
         * @param {String} path - path to the repo
         * @returns {Boolean} `true` if succeeded, `false` if a proper place for a `.gitattributes` file could not be found
         */
        serializeAttributesIntoRepo(path: string): boolean;

        /**
         * Parse rules from input string
         * @remarks Parsing does not clear previously parsed rules. This is to allow parsing global + local files etc.
         * @param {String} data
         * @param {Boolean} [includeComments=false] - return a rule even for a comment (will have `pattern=null`)
         * @param {Boolean} [includeEmptyLines=false] - return an empty rule for empty lines
         */
        parse(data: string, includeComments?: boolean, includeEmptyLines?: boolean);

        /**
         * Serializes the rules into a `.gitattributes` format.
         * The output can be written to a file.
         * @returns {String}
         */
        serialize(): string;

        /**
         * Read a single line. You an use this with one-by-line readers.
         * @param {String} line
         * @param {Boolean} [includeComments=false] - return a rule even for a comment (will have `pattern=null`)
         * @param {Boolean} [includeEmptyLines=false] - return an empty rule for empty lines
         */
        readLine(line: string, includeComments?: boolean, includeEmptyLines?: boolean);

        /**
         * Fetch all the rules for the specified path
         * @param {String} path - the path of the file relative to the repo
         * @returns {GitAttributes.Rule[]} array of rules
         */
        rulesForPath(path: string): Rule[];

        /**
         * Fetch all attributes related to a specific path
         * @param {String} path - the path of the file relative to the repo
         * @returns {Object<String, Boolean|String>} attributes
         */
        attrsForPath(path: string): object[];

        /**
         * Parse a rule
         * @param {String} rule
         * @param {Boolean} [includeComments=false] - return a rule even for a comment (will have `pattern=null`)
         * @param {Boolean} [includeEmptyLines=false] - return an empty rule for empty lines
         * @returns {GitAttributes.Rule|null}
         */
        static parseRule(rule: string, includeComments?: boolean, includeEmptyLines?: boolean): Rule | null;

        /**
         * Serializes a rule to a string
         * @param {GitAttributes.Rule|null} rule
         * @returns {String|null}
         */
        static serializeRule(rule: Rule | null): string | null;

        /**
         * Parse a rule's attributes
         * @param {String} input - attributes input
         * @returns {Object<String, Boolean|String>}
         */
        static parseAttributes(input: string): object;

        /**
         * Retrieve the path to the `.gitattributes` file
         * @param {String} repoPath - path to the repo, or any path inside the repo
         * @param {Boolean} [validate=true] - make sure that a `.gitattributes` file actually exists
         * @returns {String|null} The path to the `.gitattributes` file, or null if not found.
         */
        static findAttributesFile(repoPath: string, validate?: boolean): string | null;
    }

    export = GitAttributes;
}
