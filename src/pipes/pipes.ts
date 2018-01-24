import { Pipe, PipeTransform } from '@angular/core';  //引入PipeTransform是为了继承transform方法

// @Pipe({ name: 'sexReform' })  //name属性值惯用小驼峰是写法
// export class SexReformPipe implements PipeTransform {
//     transform(value: string): string {
//         switch (value) {
//             case 'male': return '男';
//             case 'female': return '女';
//             default: return '不男不女或雌雄同体';
//         }
//     }
// }

@Pipe({ name: 'filmtype' })  //name属性值惯用小驼峰是写法
export class FilmTypePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'normal': return '普通影片';
            case 'imax': return 'IMAX';
            case '3D': return '3D';
            case 'imax/3d': return 'IMAX/3D';
            case 'cmax': return '中国巨幕';
            case 'dmax': return 'DMAX';
        }
    }
}

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
    name: 'AgePipe'
})
export class AgePipe {

    // Transform is the new "return function(value, args)" in Angular 1.x
    transform(value, args?) {
        // ES6 array destructuring
        let minAge: any = args;
        return value.filter(person => {
            return person.age >= minAge;
        });
    }

}

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
    name: 'DatePipe'
})
export class DatePipe implements PipeTransform {
    transform(value, param, filter?) {
        if (value != undefined) {
            let minAge: any = filter;
            return value.filter(data => {
                return data[param] == minAge;
            });
        }
    }

}

// @Pipe({
//     name: 'ordinal'
// })
// export class OrdinalPipe implements PipeTransform {
//     transform(value: number): string {
//         let suffix = '';
//         let last = value % 10;
//         let specialLast = value % 100;
//         if (!value || value < 1) {
//             return '' + value;
//         }
//         if (last === 1 && specialLast !== 11) {
//             suffix = 'st';
//         } else if (last === 2 && specialLast !== 12) {
//             suffix = 'nd';
//         } else if (last === 3 && specialLast !== 13) {
//             suffix = 'rd';
//         } else {
//             suffix = 'th';
//         }
//         return value + suffix;
//     }
// }