import Store from '../lib';

export const updateSync = (newTitle) => {
    Store.update('app', { title: newTitle });
};

export const updateAsync = (newTitle) => {
    Store.update('app', { loading: true});
    setTimeout(() => {
        Store.update('app', { loading: false, title: newTitle });
    }, 1000);
};

export const loadRecord = (param) => {
    Store.update('record', { param: param, loading: true });
    setTimeout(() => {
        Store.update('record', { record: { field: param }, loading: false });
    }, 1000);
};

export const autosaveRecord = (state) => {
    const { saved, loading } = state;
    if (saved || loading) return;
    Store.update('record', { loading: true });
    setTimeout(() => {
        Store.update('record', { saved: true, loading: false });
    }, 1000);
};

export const changeRecord = () => {
    Store.update('record', { data: { field: 'bla' }, saved: false });
}