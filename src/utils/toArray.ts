type Mapper <T, TResult = T> = ((item: T) => TResult)

const mapperDefault = (item) => item; 

export default function toArray<T extends object, TResult>(obj: T, mapper: Mapper<T, TResult> = mapperDefault): TResult[] {
    if (!obj) {
        console.error(`Cannot convert object to array of type ${typeof obj}`);
    }

    return Object.keys(obj).map((key: string) => mapper(obj[key]));
}