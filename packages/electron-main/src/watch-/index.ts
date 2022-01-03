import { _watch_fs } from './fs'
import { _watch_hotkey } from './hotkey'
import { _watch_path } from './path'
import { WatchSearch } from './search'
import { _watch_shard } from './shard'
import { WatchTest } from './test1'
import { _watch_window } from './window'

/** 观察所有通信 */
export function watch_all() {
    WatchTest.watch()
    _watch_path()
    WatchSearch.watch()
}
