'use strict';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

module.exports = fp(function (fastify: FastifyInstance) {
    fastify.decorate('print', function () {
        console.log('\x1b[32m', '------------------', '\x1b[37m', '\n');

        var args = [...arguments];
        args.forEach((i) => {
            console.log('');
            console.log(i);
            console.log('');
        });

        console.log('\n', '\x1b[32m', '---------------', '\x1b[37m');
    });
});

declare module 'fastify' {
    export interface FastifyInstance {
        /** 
         ``` js
            print(343);
            print([])
            print({},[],232,"asdf")
        ```
         */
        print(param: any): void;
    }
}
