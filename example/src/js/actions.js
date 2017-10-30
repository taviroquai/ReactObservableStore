import Store from '../../../src/ReactObservableStore';

export const updateSync = (newTitle) => {
    Store.update('namespace', {title: {nested: newTitle}});
};

export const updateAsync = (newTitle) => {
    Store.update('namespace', {loading: true});
    setTimeout(() => {
        Store.update('namespace', {loading: false, title: {nested: newTitle}});
    }, 2000);
};
