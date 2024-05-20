import { Util } from '@/util'

export function PageConfig() {
    Util.caches.groups.save(['dddd'])
    console.log(Util.caches.groups.load())

    return <div className={'text-base'}>cccc</div>
}
