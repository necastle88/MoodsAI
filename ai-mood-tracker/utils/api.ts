const createURL = (path: string) => {
    return window.location.origin + path;
};

export const updateEntry = async (id: string, content: string) => { 
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
    }));

    if (!res.ok) {
        throw new Error('Failed to update entry');
    }

    const data = await res.json();
    return data.data;
}

export const createNewEntry = async () => {
    const response = await fetch(new Request(createURL('/api/journal'), {
        method: 'POST',
    }));

    if (!response.ok) {
        throw new Error('Failed to create new entry');
    }

    const data = await response.json();
    return data.data;   
}

